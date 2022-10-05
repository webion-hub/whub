export class WebionRepository {
  static readonly ADDRESS = 'Via Panfilo Castaldi, 3, 41123 Modena MO';
  static readonly MAPS_ADDRESS = 'http://maps.google.com/?q=Webion SRL';

  static readonly EMAIL = 'amministrazione@webion.it';
  static readonly PHONE = '+39 389 008 6632';
  static readonly PEC = 'webionsrl@legalmail.it';

  static readonly HREF_EMAIL = `mailto:${this.EMAIL}`;
  static readonly HREF_PHONE = `tel:${this.PHONE}`;
  static readonly HREF_PEC = `mailto:${this.PEC}`;

  static readonly IVA = 'IT04013210366';
  static readonly FACEBOOK = 'https://www.facebook.com/webionsrl';
  static readonly INSTAGRAM = 'https://www.instagram.com/webion.it/';
  static readonly QUORA = 'https://www.quora.com/profile/Webion';
  static readonly LINKEDIN = 'https://www.linkedin.com/company/79045044/admin/';
  static readonly GITHUB = 'https://github.com/webion-hub';

  static openEmail = () => this.sethref(this.HREF_EMAIL);
  static openPhone = () => this.sethref(this.HREF_PHONE);
  static openPec = () => this.sethref(this.HREF_PEC);
  static openFacebook = () => this.open(this.FACEBOOK);
  static openInstagram = () => this.open(this.INSTAGRAM);
  static openQuora = () => this.open(this.QUORA);
  static openLinkedin = () => this.open(this.LINKEDIN);
  static openGithub = () => this.open(this.GITHUB);
  static openAddress = () => this.open(this.MAPS_ADDRESS);

  private static sethref(url: string) {
    window.location.href = url;
  }

  private static open(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
