export class WebionRepository {
  static readonly ADDRESS = 'Via Placido Rizzotto, 50, 41126 Modena MO';
  static readonly MAPS_ADDRESS = 'http://maps.google.com/?q=Webion SRL';

  static readonly EMAIL = 'amministrazione@webion.it';
  static readonly PHONE = '+39 375 776 8253';
  static readonly PEC = 'webionsrl@legalmail.it';

  static readonly HREF_EMAIL = `mailto:${this.EMAIL}`;
  static readonly HREF_PHONE = `tel:${this.PHONE}`;
  static readonly HREF_PEC = `mailto:${this.PEC}`;

  static readonly IVA = 'IT04013210366';
  static readonly LINKEDIN = 'https://www.linkedin.com/company/79045044/admin/';
  static readonly GITHUB = 'https://github.com/webion-hub';

  static openEmail = (opt?: { subject?: string }) => {
    return this.sethref(
      this.HREF_EMAIL,
      opt?.subject
        ? `?subject=${opt.subject}`
        : ''
    );
  }

  static openPhone = () => this.sethref(this.HREF_PHONE);
  static openPec = () => this.sethref(this.HREF_PEC);
  static openLinkedin = () => this.open(this.LINKEDIN);
  static openGithub = () => this.open(this.GITHUB);
  static openAddress = () => this.open(this.MAPS_ADDRESS);

  private static sethref(url: string, params: string = "") {
    window.location.href = url + params;
  }

  private static open(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
