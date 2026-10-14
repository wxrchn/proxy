/***
 * Clash Verge Rev / Mihomo Party 深度融合优化脚本
 * 映射自 Shadowrocket 高阶精炼配置架构
 */

// --- 1. 静态基础参数 ---
const _skipIps = [
  '10.0.0.0/8',
  '100.64.0.0/10',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '172.16.0.0/12',
  '192.0.0.0/24',
  '192.0.2.0/24',
  '192.88.99.0/24',
  '192.168.0.0/16',
  '198.51.100.0/24',
  '203.0.113.0/24',
  '224.0.0.0/4',
  '255.255.255.255/32',
  '239.255.255.250/32',
  'ff02::fb/128',
  'fc00::/7',
  'fe80::/10',
  '::1/128',
]

// 跳过代理的本地与金融敏感域名（对齐小火箭 skip-proxy）
const _skipDomains = [
  '*.local',
  'captive.apple.com',
  '*.ccb.com',
  '*.abchina.com.cn',
  '*.psbc.com',
  '*.icbc.com.cn',
  '*.boc.cn',
  '*.bankcomm.com',
  '*.cib.com.cn',
  '*.baidu.com',
  '*.163.com',
]

// 6 大核心国家地区正则定义（使用与小火箭相同的黑白名单正则过滤）
const mainRegions = [
  {
    name: '香港',
    regex: /(?=.*(🇭🇰|HK|HKG|Hong|香港|深港|沪港|京港|港))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png',
  },
  {
    name: '台湾',
    regex: /(?=.*(🇹🇼|TW|TWN|Taiwan|Taipei|台湾|台灣|台北|台中|新北|彰化))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Taiwan.png',
  },
  {
    name: '新加坡',
    regex: /(?=.*(🇸🇬|SG|SGP|Sing|Singapore|新加坡|狮城))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png',
  },
  {
    name: '韩国',
    regex: /(?=.*(🇰🇷|KR|KOR|Korea|韩国|首尔|韩|韓|春川))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Korea.png',
  },
  {
    name: '日本',
    regex: /(?=.*(🇯🇵|JP|JPN|Japan|Tokyo|日本|日|东京|大阪|埼玉|川日|泉日))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png',
  },
  {
    name: '美国',
    regex: /(?=.*(🇺🇸|US|USA|America|United States|美国|洛杉矶|硅谷|波特兰|达拉斯|俄勒冈|圣何塞|凤凰城|西雅图|费利蒙|拉斯维加斯|圣克拉拉|芝加哥|纽约))(?!.*(回国|校园|游戏|🎮|GAME))/i,
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png',
  },
]

// 策略组通用参数
const groupBaseOption = {
  interval: 600,
  timeout: 5000,
  url: 'http://www.gstatic.com/generate_204',
  lazy: true,
  'max-failed-times': 3,
}

// 预定义 .mrs 二进制规则源（MetaCubeX 官方）
const ruleProviders = {
  adblock: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/217heidai/adblockfilters/main/rules/adblockmihomo.mrs',
    path: './rules/adblock.mrs',
    interval: 86400,
  },
  ai: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs',
    path: './rules/ai.mrs',
    interval: 86400,
  },
  tiktok: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs',
    path: './rules/tiktok.mrs',
    interval: 86400,
  },
  netflix: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/netflix.mrs',
    path: './rules/netflix.mrs',
    interval: 86400,
  },
  disney: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/disney.mrs',
    path: './rules/disney.mrs',
    interval: 86400,
  },
  hbo: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/hbo.mrs',
    path: './rules/hbo.mrs',
    interval: 86400,
  },
  primevideo: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/primevideo.mrs',
    path: './rules/primevideo.mrs',
    interval: 86400,
  },
  hulu: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/hulu.mrs',
    path: './rules/hulu.mrs',
    interval: 86400,
  },
  apple: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs',
    path: './rules/apple.mrs',
    interval: 86400,
  },
  microsoft: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs',
    path: './rules/microsoft.mrs',
    interval: 86400,
  },
  lan: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs',
    path: './rules/lan.mrs',
    interval: 86400,
  },
  cn: {
    type: 'http',
    behavior: 'domain',
    format: 'mrs',
    url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs',
    path: './rules/cn.mrs',
    interval: 86400,
  },
}

// --- 2. 主入口函数 ---
function main(config) {
  const proxies = config?.proxies || []
  if (proxies.length === 0 && !config['proxy-providers']) return config

  // 2.0 Reality 节点补丁：兼容 Xray 26.9.9+ 的 mlkem768 协商
  const MLKEM_KEY = 'support-x25519mlkem768'
  proxies.forEach((p) => {
    if (p.type !== 'vless') return
    if (p['reality-opts']) p['reality-opts'][MLKEM_KEY] = true
    const ds = p['xhttp-opts']?.['download-settings']
    if (ds?.['reality-opts']) ds['reality-opts'][MLKEM_KEY] = true
  })

  // 2.1 覆盖全局网络层基础配置
  config['mode'] = 'rule'
  config['ipv6'] = true
  config['allow-lan'] = true
  config['bind-address'] = '*'
  config['unified-delay'] = true
  config['tcp-concurrent'] = true
  config['keep-alive-interval'] = 1800
  config['find-process-mode'] = 'strict'
  config['profile'] = { 'store-selected': true, 'store-fake-ip': true }

  // 2.2 DNS 防泄漏与快速解析（对齐小火箭高可用双栈）
  config['dns'] = {
    enable: true,
    listen: ':1053',
    ipv6: true,
    'prefer-h3': false,
    'use-hosts': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': ['*.lan', '*.local', 'captive.apple.com'],
    'default-nameserver': ['223.5.5.5', '119.29.29.29'],
    'direct-nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
      '223.5.5.5',
      '119.29.29.29',
    ],
    nameserver: [
      'https://doh.pub/dns-query',
      'https://dns.alidns.com/dns-query',
      '223.5.5.5',
      '119.29.29.29',
    ],
    'proxy-server-nameserver': [
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
    ],
  }

  // 2.3 TUN 模式与旁路排除（完整补全 IPv6 局域段）
  config['tun'] = {
    enable: true,
    stack: 'mixed',
    device: 'utun1999',
    'auto-route': true,
    'auto-detect-interface': true,
    'strict-route': true,
    'route-exclude-address': _skipIps,
    'dns-hijack': [
      '8.8.8.8:53',
      '8.8.4.4:53',
      '1.1.1.1:53',
      '1.0.0.1:53',
      'any:53',
      'tcp://any:53',
    ],
  }

  // 2.4 域名嗅探与网银/诊断域名跳过
  config['sniffer'] = {
    enable: true,
    'force-dns-mapping': true,
    'parse-pure-ip': true,
    'override-destination': true,
    sniff: {
      TLS: { ports: [443, 8443] },
      HTTP: { ports: [80, '8080-8880'] },
      QUIC: { ports: [443, 8443] },
    },
    'skip-src-address': _skipIps.filter((ip) => ip !== '198.18.0.0/16'),
    'skip-domain': _skipDomains,
  }

  // 2.5 节点分类分拣逻辑
  const regionProxies = {}
  mainRegions.forEach((r) => (regionProxies[r.name] = []))
  const otherProxies = []

  // 过滤废弃公告节点
  const dropRegex = /(回国|校园|游戏|🎮|GAME|群|官网|网站|网址|订阅|流量|到期|剩余|已用|发布|工单|通知|备用|失联|版本)/i

  proxies.forEach((p) => {
    let matched = false
    for (const r of mainRegions) {
      if (r.regex.test(p.name)) {
        regionProxies[r.name].push(p.name)
        matched = true
        break
      }
    }
    // 未匹配进 6 大主要地区、且不是机场公告废弃行，自动落入“其他”
    if (!matched && !dropRegex.test(p.name)) {
      otherProxies.push(p.name)
    }
  })

  // 生成 6 大地区的 url-test 测速组
  const generatedRegionGroups = []
  mainRegions.forEach((r) => {
    if (regionProxies[r.name].length > 0) {
      generatedRegionGroups.push({
        ...groupBaseOption,
        name: r.name,
        type: 'url-test',
        tolerance: 50,
        icon: r.icon,
        proxies: regionProxies[r.name],
      })
    }
  })

  // 生成“其他”策略组（容纳所有冷门/小众国家节点）
  if (otherProxies.length > 0) {
    generatedRegionGroups.push({
      ...groupBaseOption,
      name: '其他',
      type: 'select',
      proxies: otherProxies,
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/World_Map.png',
    })
  }

  // 2.6 构建功能策略组（顺序与命名同小火箭一致）
  const functionalGroups = [
    // 1. 自定义特定业务组
    {
      ...groupBaseOption,
      name: 'AI',
      type: 'select',
      proxies: ['台湾', '新加坡', '美国', '香港', '韩国', '日本', '其他'],
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png',
    },
    {
      ...groupBaseOption,
      name: 'TIKTOK',
      type: 'select',
      proxies: ['新加坡', '美国', '台湾', '韩国', '日本', '香港', '其他'],
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png',
    },
    {
      ...groupBaseOption,
      name: '流媒体',
      type: 'select',
      proxies: ['香港', '台湾', '新加坡', '美国', '韩国', '日本', '其他', 'DIRECT'],
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Streaming!CN.png',
    },
    // 2. 大一统海外代理与兜底
    {
      ...groupBaseOption,
      name: '默认',
      type: 'select',
      proxies: ['香港', '台湾', '新加坡', '韩国', '日本', '美国', '其他', 'DIRECT'],
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png',
    },
    {
      ...groupBaseOption,
      name: '兜底',
      type: 'fallback',
      proxies: ['香港', '台湾', '新加坡', '韩国', '日本', '美国', '其他', 'DIRECT'],
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Round_Robin.png',
    },
  ]

  // 2.7 装载完整策略组
  config['proxy-groups'] = [...functionalGroups, ...generatedRegionGroups]

  // 2.8 分流规则（1:1 映射小火箭 [Rule]）
  config['rules'] = [
    // 银行与特定金融直连
    'DOMAIN-SUFFIX,ultramobile.com,DIRECT',
    'DOMAIN-SUFFIX,ultra.me,DIRECT',
    'DOMAIN-SUFFIX,za.group,DIRECT',
    'DOMAIN-SUFFIX,americanexpress.com,DIRECT',
    'DOMAIN-SUFFIX,capitalone.com,DIRECT',
    'DOMAIN-SUFFIX,bochk.com,DIRECT',

    // 限制美国 IP 访问的特定业务
    'DOMAIN-SUFFIX,paze.com,美国',
    'DOMAIN-SUFFIX,fidelity.com,美国',
    'DOMAIN-SUFFIX,creditkarma.com,美国',
    'DOMAIN-SUFFIX,muse.ai,美国',

    // 广告过滤
    'RULE-SET,adblock,REJECT',

    // 业务手选组
    'RULE-SET,ai,AI',
    'RULE-SET,tiktok,TIKTOK',

    // 大一统国际流媒体
    'RULE-SET,netflix,流媒体',
    'RULE-SET,disney,流媒体',
    'RULE-SET,hbo,流媒体',
    'RULE-SET,primevideo,流媒体',
    'RULE-SET,hulu,流媒体',

    // 苹果与微软服务（直连跑满宽带）
    'RULE-SET,apple,DIRECT',
    'RULE-SET,microsoft,DIRECT',

    // 局域网与国内直连
    'RULE-SET,lan,DIRECT',
    'RULE-SET,cn,DIRECT',
    'GEOIP,CN,DIRECT,no-resolve',

    // 终极兜底（小火箭的 FINAL,兜底）
    'MATCH,兜底',
  ]

  config['rule-providers'] = ruleProviders

  return config
}
