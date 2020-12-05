const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "难凉热血",
    avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:"仅能看到Dashboard、开发文档、权限测试和关于作者四个页面",
  },
};

export default {
  login: (request: any) => {
    const { username } = JSON.parse(request.body)
    const token = (tokens as any)[username] as string
    if (!token) {
      return {
        status: 1,
        message: 'username or password is wrong!'
      }
    } else {
      return {
        status: 0,
        token
      }
    }
  }
}