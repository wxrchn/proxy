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

// 6 大核心国家地区正则定义
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

  // Reality 节点兼容补丁
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

  // DNS 覆写（吸收优点：注入苹果系统原生直析 policy）
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
    'nameserver-policy': {
      '+.apple.com': 'system',
      '+.icloud.com': 'system',
    },
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

  // --- 节点分类逻辑 ---
  const regionProxies = {}
  mainRegions.forEach((r) => (regionProxies[r.name] = []))
  const otherProxies = []

  const dropRegex = /^(?=.*(套餐|到期|时间|官网|通知|发布|群|联系|工单|说明|防止|维护)).*$/i

  proxies.forEach((p) => {
    const nodeName = typeof p === 'string' ? p : p?.name
    if (!nodeName) return
    if (dropRegex.test(nodeName)) return

    let matched = false
    for (const r of mainRegions) {
      if (r.regex.test(nodeName)) {
        regionProxies[r.name].push(nodeName)
        matched = true
        break
      }
    }

    if (!matched) {
      otherProxies.push(nodeName)
    }
  })

  // 生成 6 大主要国家组
  const generatedRegionGroups = []
  mainRegions.forEach((r) => {
    const hasNodes = regionProxies[r.name].length > 0
    generatedRegionGroups.push({
      ...groupBaseOption,
      name: r.name,
      type: regionProxies[r.name].length > 1 ? 'url-test' : 'select',
      tolerance: 50,
      icon: r.icon,
      proxies: hasNodes ? regionProxies[r.name] : ['DIRECT'],
    })
  })

  // 生成“其他”策略组
  generatedRegionGroups.push({
    ...groupBaseOption,
    name: '其他',
    type: 'select',
    proxies: otherProxies.length > 0 ? otherProxies : ['DIRECT'],
    icon: 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/World_Map.png',
  })

  // 核心功能策略组
  const functionalGroups = [
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

  config['proxy-groups'] = [...functionalGroups, ...generatedRegionGroups]

  // 分流规则（吸收优点：在兜底前阻断代理流量的 QUIC）
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

    // 吸收优点：封锁未命中代理流量中的 QUIC，强制回退至 HTTP/2
    'AND,((NETWORK,UDP),(DST-PORT,443)),REJECT',

    'MATCH,兜底',
  ]

  config['rule-providers'] = ruleProviders

  return config
}
