import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://Ldawn-Yxw.github.io/',
  lang: 'zh-CN',
  title: 'Ldawn-Blog',
  author: {
    name: '图图不糊涂',//博主名称
    avatar: "https://userpic.codeforces.org/3526839/title/61e8503ddb4b1446.jpg",	//头像链接
    status: {
      emoji: '💛'	// 头像旁边的emoji
    },
  },
  description: '小小技术博客',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Ldawn-Yxw',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/3493103889549538?spm_id_from=333.1007.0.0',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'E-Mail',
      link: 'https://3228892143@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: false,
  },
})
