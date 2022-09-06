export class WebionRepository {
  static readonly ADDRESS = 'Via Panfilo Castaldi, 3, 41123 Modena MO'
  static readonly MAPS_ADDRESS = 'http://maps.google.com/?q=Webion SRL'

  static readonly EMAIL = 'amministrazione@webion.it'
  static readonly PHONE = '+39 389 008 6632'
  static readonly PEC = 'webionsrl@legalmail.it'

  static readonly HREF_EMAIL = `mailto:${this.EMAIL}`
  static readonly HREF_PHONE = `tel:${this.PHONE}`
  static readonly HREF_PEC = `mailto:${this.PEC}`

  static readonly IVA = 'IT04013210366'
  static readonly FACEBOOK = 'https://www.facebook.com/webionsrl'
  static readonly INSTAGRAM = 'https://www.instagram.com/webion.it/'
  static readonly QUORA = 'https://www.quora.com/profile/Webion'
  static readonly LINKEDIN = 'https://www.linkedin.com/company/79045044/admin/'
  static readonly GITHUB = 'https://github.com/webion-hub'

  static openEmail = () => window.location.href = this.HREF_EMAIL
  static openPhone = () => window.location.href = this.HREF_PHONE
  static openPec = () => window.location.href = this.HREF_PEC
  static openFacebook = () => window.open(this.FACEBOOK, '_blank')?.focus()
  static openInstagram = () => window.open(this.INSTAGRAM, '_blank')?.focus()
  static openQuora = () => window.open(this.QUORA, '_blank')?.focus()
  static openLinkedin = () => window.open(this.LINKEDIN, '_blank')?.focus()
  static openGithub = () => window.open(this.GITHUB, '_blank')?.focus()
  static openAddress = () => window.open(this.MAPS_ADDRESS, '_blank')?.focus()
}
