type TypingConfig = {
  source: HTMLElement,
  output: HTMLElement,
  delay?: number,
  done?: Function
}

type TypingChain = {
  parent: TypingChain | null,
  dom: HTMLElement,
  val: ChainValue[]
}

type ChainValue = ({
  dom: HTMLElement | ChildNode,
  val: ChainValue[]
} | string)

class Typing {
  source: HTMLElement
  output: HTMLElement
  delay: number
  chain: TypingChain
  done?: Function

  constructor(config: TypingConfig) {
    this.source = config.source
    this.output = config.output
    this.delay = config.delay || 120
    this.done = config.done
    this.chain = {
      parent: null,
      dom: this.output,
      val: []
    }
  }

  init() {
    this.chain.val = this.convert(this.source, this.chain.val)
  }

  convert(dom: HTMLElement | ChildNode, arr: ChainValue[]): ChainValue[] {
    let children = Array.from(dom.childNodes)
    children.forEach(child => {
      if (child.nodeType === 3) {
        arr = [...arr, ...child.nodeValue?.split('')!]
      } else if (child.nodeType === 1) {
        arr.push({
          dom: child,
          val: this.convert(child, [])
        })
      }
    })
    return arr
  }

  print(dom: HTMLElement | ChildNode, val: string, callback: Function) {
    setTimeout(() => {
      dom.appendChild(document.createTextNode(val))
      callback()
    }, this.delay)
  }

  play(chain: TypingChain) {
    if (!chain.val.length) {
      if (chain.parent) this.play(chain.parent)
      else if (this.done) this.done()
      return
    }
    const val = chain.val.shift()
    if (typeof val === 'string') {
      this.print(chain.dom, val, () => {
        this.play(chain)
      })
    } else {
      const node = val?.dom.cloneNode()! as HTMLElement
      chain.dom.appendChild(node)
      this.play({
        parent: chain,
        dom: node,
        val: val?.val!
      })
    } 
  }

  start() {
    this.init()
    this.play(this.chain)
  }
}

export default Typing