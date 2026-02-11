const menu = document.getElementById('mobile-menu')
const overlay = document.getElementById('overlay')

function openMenu() {
  menu.classList.remove('translate-x-full')
  overlay.classList.remove('hidden')
}

function closeMenu() {
  menu.classList.add('translate-x-full')
  overlay.classList.add('hidden')
}

document.querySelectorAll('.btn-gradient').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    btn.style.setProperty('--x', `${x}%`)
    btn.style.setProperty('--y', `${y}%`)
  })

  btn.addEventListener('mouseleave', () => {
    btn.style.setProperty('--x', '50%')
    btn.style.setProperty('--y', '50%')
  })
})

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    btn.style.setProperty('--x', `${x}%`)
    btn.style.setProperty('--y', `${y}%`)
  })

  btn.addEventListener('mouseleave', () => {
    btn.style.setProperty('--x', '50%')
    btn.style.setProperty('--y', '50%')
  })
})

const defaultConfig = {
  hero_title:
    'Transforme Cliques em <br><span class="gradient-text">Clientes Reais</span>',
  hero_subtitle:
    'Estratégias de tráfego pago no Meta Ads e Google Ads combinadas com landing pages de alta conversão para escalar seu negócio.',
  cta_button_text: 'Solicitar Orçamento Grátis',
  services_title:
    'Serviços que <span class="gradient-text">Geram Resultados</span>',
  contact_title: 'Pronto para <span class="gradient-text">Escalar</span>?',
  whatsapp_number: '5511999999999',
  primary_color: '#8b5cf6',
  secondary_color: '#d946ef',
  background_color: '#020617',
  text_color: '#f8fafc',
  accent_color: '#22c55e',
}

let config = { ...defaultConfig }

function openWhatsApp(e) {
  e.preventDefault()
  const number = config.whatsapp_number || defaultConfig.whatsapp_number
  const message = encodeURIComponent(
    'Olá! Vim pelo site e gostaria de saber mais sobre os serviços de tráfego pago.',
  )
  window.open(
    `https://wa.me/5512997306924?text=${message}`,
    '_blank',
    'noopener,noreferrer',
  )
}

async function onConfigChange(cfg) {
  config = { ...defaultConfig, ...cfg }

  document.getElementById('hero-title').innerHTML =
    config.hero_title || defaultConfig.hero_title
  document.getElementById('hero-subtitle').textContent =
    config.hero_subtitle || defaultConfig.hero_subtitle
  document.getElementById('hero-cta').innerHTML =
    `${config.cta_button_text || defaultConfig.cta_button_text} <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>`
  document.getElementById('services-title').innerHTML =
    config.services_title || defaultConfig.services_title
  document.getElementById('contact-title').innerHTML =
    config.contact_title || defaultConfig.contact_title
}

function mapToCapabilities(cfg) {
  return {
    recolorables: [
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => {
          cfg.background_color = value
          if (window.elementSdk)
            window.elementSdk.setConfig({ background_color: value })
        },
      },
      {
        get: () => cfg.primary_color || defaultConfig.primary_color,
        set: (value) => {
          cfg.primary_color = value
          if (window.elementSdk)
            window.elementSdk.setConfig({ primary_color: value })
        },
      },
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => {
          cfg.text_color = value
          if (window.elementSdk)
            window.elementSdk.setConfig({ text_color: value })
        },
      },
      {
        get: () => cfg.secondary_color || defaultConfig.secondary_color,
        set: (value) => {
          cfg.secondary_color = value
          if (window.elementSdk)
            window.elementSdk.setConfig({ secondary_color: value })
        },
      },
      {
        get: () => cfg.accent_color || defaultConfig.accent_color,
        set: (value) => {
          cfg.accent_color = value
          if (window.elementSdk)
            window.elementSdk.setConfig({ accent_color: value })
        },
      },
    ],
    borderables: [],
    fontEditable: {
      get: () => cfg.font_family || 'Outfit',
      set: (value) => {
        cfg.font_family = value
        if (window.elementSdk)
          window.elementSdk.setConfig({ font_family: value })
      },
    },
    fontSizeable: {
      get: () => cfg.font_size || 16,
      set: (value) => {
        cfg.font_size = value
        if (window.elementSdk) window.elementSdk.setConfig({ font_size: value })
      },
    },
  }
}

function mapToEditPanelValues(cfg) {
  return new Map([
    ['hero_title', cfg.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
    ['cta_button_text', cfg.cta_button_text || defaultConfig.cta_button_text],
    ['services_title', cfg.services_title || defaultConfig.services_title],
    ['contact_title', cfg.contact_title || defaultConfig.contact_title],
    ['whatsapp_number', cfg.whatsapp_number || defaultConfig.whatsapp_number],
  ])
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues,
  })
} else {
  onConfigChange(defaultConfig)
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href !== '#') {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  })
})
