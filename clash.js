/***
 * Clash Verge Rev / Mihomo Party 深度融合优化脚本
 * https://raw.githubusercontent.com/wxrchn/proxy/refs/heads/main/clash.js
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

// 6 大核心国家地区正则
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

const groupBaseOption = {
  interval: 600,
  timeout: 5000,
  url: 'http://www.gstatic.com/generate_204',
  lazy: true,
  'max-failed-times': 3,
}

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

  // Reality 节点 mlkem768 兼容补丁
  const MLKEM_KEY = 'support-x25519mlkem768'
  proxies.forEach((p) => {
    if (p && p.type === 'vless') {
      if (p['reality-opts']) p['reality-opts'][MLKEM_KEY] = true
      const ds = p['xhttp-opts']?.['download-settings']
      if (ds?.['reality-opts']) ds['reality-opts'][MLKEM_KEY] = true
    }
  })

  // 网络层基础配置
  config['mode'] = 'rule'
  config['ipv6'] = true
  config['allow-lan'] = true
  config['bind-address'] = '*'
  config['unified-delay'] = true
  config['tcp-concurrent'] = true
  config['keep-alive-interval'] = 1800
  config['find-process-mode'] = 'strict'
  config['profile'] = { 'store-selected': true, 'store-fake-ip': true }

  // DNS 防泄漏配置
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

  // TUN 模式与排除路由
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

  // 域名嗅探
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

  // --- 节点分类安全提取逻辑（彻底排查漏节点）---
  const regionProxies = {}
  mainRegions.forEach((r) => (regionProxies[r.name] = []))
  const otherProxies = []

  // 仅过滤开头的纯广告/信息通知行，避免误伤正规节点
  const dropRegex = /^(?=.*(套餐|流量|到期|时间|官网|通知|发布|群|联系|工单|提示|说明|备用|失联|防止)).*$/i

  proxies.forEach((p) => {
    // 兼容对象和字符串两种数据类型
    const nodeName = typeof p === 'string' ? p : p?.name
    if (!nodeName) return

    // 剔除纯公告行
    if (dropRegex.test(nodeName)) return

    let matched = false
    for (const r of mainRegions) {
      if (r.regex.test(nodeName)) {
        regionProxies[r.name].push(nodeName)
        matched = true
        break
      }
    }

    // 只要不是 6 大主流国家，其余节点（英国、德国、土耳其、阿根廷、法国等）100% 收录进其他
    if (!matched) {
      otherProxies.push(nodeName)
    }
  })

  // 动态生成 6 大主要国家组
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

  // 【关键修复】：强制生成“其他”策略组，有节点放节点，无节点防死锁放 DIRECT
  generatedRegionGroups.push({
    ...groupBaseOption,
    name: '其他',
    type: 'select',
    proxies: otherProxies.length > 0 ? otherProxies : ['DIRECT'],
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/World_Map.png',
  })

  // 收集有效地区名称
  const activeRegionNames = generatedRegionGroups.map((g) => g.name)

  // 构建业务策略组
  const functionalGroups = [
    {
      ...groupBaseOption,
      name: 'AI',
      type: 'select',
      proxies: ['台湾', '新加坡', '美国', '香港', '韩国', '日本', '其他'].filter(
        (n) => activeRegionNames.includes(n)
      ),
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png',
    },
    {
      ...groupBaseOption,
      name: 'TIKTOK',
      type: 'select',
      proxies: ['新加坡', '美国', '台湾', '韩国', '日本', '香港', '其他'].filter(
        (n) => activeRegionNames.includes(n)
      ),
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png',
    },
    {
      ...groupBaseOption,
      name: '流媒体',
      type: 'select',
      proxies: [
        '香港',
        '台湾',
        '新加坡',
        '美国',
        '韩国',
        '日本',
        '其他',
        'DIRECT',
      ].filter((n) => n === 'DIRECT' || activeRegionNames.includes(n)),
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Streaming!CN.png',
    },
    {
      ...groupBaseOption,
      name: '默认',
      type: 'select',
      proxies: [
        '香港',
        '台湾',
        '新加坡',
        '韩国',
        '日本',
        '美国',
        '其他',
        'DIRECT',
      ].filter((n) => n === 'DIRECT' || activeRegionNames.includes(n)),
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Proxy.png',
    },
    {
      ...groupBaseOption,
      name: '兜底',
      type: 'fallback',
      proxies: [
        '香港',
        '台湾',
        '新加坡',
        '韩国',
        '日本',
        '美国',
        '其他',
        'DIRECT',
      ].filter((n) => n === 'DIRECT' || activeRegionNames.includes(n)),
      icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Round_Robin.png',
    },
  ]

  config['proxy-groups'] = [...functionalGroups, ...generatedRegionGroups]

  // 分流规则
  config['rules'] = [
    'DOMAIN-SUFFIX,ultramobile.com,DIRECT',
    'DOMAIN-SUFFIX,ultra.me,DIRECT',
    'DOMAIN-SUFFIX,za.group,DIRECT',
    'DOMAIN-SUFFIX,americanexpress.com,DIRECT',
    'DOMAIN-SUFFIX,capitalone.com,DIRECT',
    'DOMAIN-SUFFIX,bochk.com,DIRECT',

    'DOMAIN-SUFFIX,paze.com,美国',
    'DOMAIN-SUFFIX,fidelity.com,美国',
    'DOMAIN-SUFFIX,creditkarma.com,美国',
    'DOMAIN-SUFFIX,muse.ai,美国',

    'RULE-SET,adblock,REJECT',

    'RULE-SET,ai,AI',
    'RULE-SET,tiktok,TIKTOK',

    'RULE-SET,netflix,流媒体',
    'RULE-SET,disney,流媒体',
    'RULE-SET,hbo,流媒体',
    'RULE-SET,primevideo,流媒体',
    'RULE-SET,hulu,流媒体',

    'RULE-SET,apple,DIRECT',
    'RULE-SET,microsoft,DIRECT',

    'RULE-SET,lan,DIRECT',
    'RULE-SET,cn,DIRECT',
    'GEOIP,CN,DIRECT,no-resolve',

    'MATCH,兜底',
  ]

  config['rule-providers'] = ruleProviders

  return config
}
