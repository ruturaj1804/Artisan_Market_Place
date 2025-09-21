import React from 'react';

import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    about: [
      { label: 'Our Story', href: '#' },
      { label: 'Mission & Vision', href: '#' },
      { label: 'Artisan Partners', href: '#' },
      { label: 'Cultural Impact', href: '#' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns Policy', href: '#' },
      { label: 'Size Guide', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Artisan Agreement', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: 'Instagram', href: '#', color: 'hover:text-pink-600' },
    { name: 'Twitter', icon: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { name: 'YouTube', icon: 'Youtube', href: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold text-lg text-foreground leading-none">
                  ArtisanAI
                </span>
                <span className="font-caption text-xs text-muted-foreground leading-none">
                  Marketplace
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Empowering Indian artisans through AI-powered marketplace technology. 
              Connecting authentic cultural crafts with global audiences.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} className="text-accent" />
              <span>Made in India with ❤️</span>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks?.about?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks?.support?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Connect</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} className="text-accent" />
                <span>hello@artisanai.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={14} className="text-accent" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className={`text-muted-foreground ${social?.color} transition-colors`}
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} ArtisanAI Marketplace. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {footerLinks?.legal?.map((link, index) => (
                <a
                  key={index}
                  href={link?.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link?.label}
                </a>
              ))}
            </div>
          </div>

          {/* Cultural Accent */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="w-1 h-1 bg-secondary rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-r from-primary via-accent to-secondary"></div>
              <div className="w-1 h-1 bg-secondary rounded-full"></div>
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="w-1 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;