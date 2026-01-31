"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import styles from './ContactForm.module.scss';

// CSS to inject into HubSpot form iframe (when same-origin) - lighter layout so checkbox/names align
const HUBSPOT_IFRAME_CSS = `
.hs-form, form { display: flex !important; flex-direction: column !important; gap: 1.25rem !important; align-items: stretch !important; }
.form-columns-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 1rem !important; align-items: start !important; }
.form-columns-1 { width: 100% !important; }
.hs-form-field { display: flex !important; flex-direction: column !important; gap: 0.5rem !important; width: 100% !important; }
.hs-form-booleancheckbox, .hs-form-field .inputs ul, .hs-form-field:has(input[type="checkbox"]) { display: flex !important; flex-direction: row !important; align-items: center !important; gap: 0.5rem !important; flex-wrap: wrap !important; }
.hs-form-booleancheckbox label { display: flex !important; align-items: center !important; margin: 0 !important; padding: 0 !important; font-weight: 500 !important; cursor: pointer !important; }
.hs-form-booleancheckbox input, .hs-form-field input[type="checkbox"] { width: 1.25rem !important; min-width: 1.25rem !important; height: 1.25rem !important; margin: 0 0.5rem 0 0 !important; flex-shrink: 0 !important; vertical-align: middle !important; }
.hs-form-field:has(input[type="checkbox"]) .inputs { margin: 0 !important; }
.hs-form-field:has(input[type="checkbox"]) label { margin-bottom: 0 !important; order: 1 !important; }
.hs-form-field .hs-reset-link, .hs-form a[href*="reset"] { display: none !important; }
.hs-form-field:has(.legal-consent-container), .hs-form-field:has(.hs-consent-container) { display: flex !important; flex-direction: column !important; gap: 1rem !important; width: 100% !important; }
.hs-form-field:has(.legal-consent-container) > *, .hs-form-field:has(.hs-consent-container) > * { display: flex !important; flex-direction: column !important; gap: 1rem !important; width: 100% !important; max-width: 100% !important; padding-left: 0 !important; margin-left: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; }
.hs-form-field:has(.legal-consent-container) .hs-richtext, .hs-form-field:has(.hs-consent-container) .hs-richtext { margin-top: 0 !important; margin-bottom: 0 !important; }
.legal-consent-container + *, .hs-consent-container + * { margin-top: 0 !important; }
div:has(.legal-consent-container):has(.hs-richtext), div:has(.hs-consent-container):has(.hs-richtext) { display: flex !important; flex-direction: column !important; gap: 1rem !important; width: 100% !important; }
.hs-richtext { width: 100% !important; max-width: 100% !important; }
.hs-label, label { font-weight: 600 !important; color: #333 !important; font-size: 0.95rem !important; }
input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, textarea, .hs-input {
  padding: 1rem 1.25rem !important; border: 2px solid #e5e7eb !important; border-radius: 12px !important;
  font-size: 1rem !important; line-height: 1.5 !important; background: #fff !important; color: #333 !important; width: 100% !important; box-sizing: border-box !important;
}
input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, .hs-input { min-height: 3.25rem !important; }
input:focus, select:focus, textarea:focus { outline: none !important; border-color: #000 !important; box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.1) !important; }
select { cursor: pointer !important; padding-right: 3rem !important; height: auto !important; }
textarea { min-height: 220px !important; resize: vertical !important; line-height: 1.6 !important; }
.hs-button, input[type="submit"], .hs_submit .hs-button, .hs_submit input, .actions input[type="submit"] {
  background: linear-gradient(135deg, #E30613 0%, #ff4757 100%) !important; background-color: #E30613 !important;
  color: #fff !important; padding: 1.25rem 3rem !important; border: none !important; border-radius: 12px !important;
  font-size: 1.1rem !important; font-weight: 600 !important; cursor: pointer !important;
  box-shadow: 0 4px 20px rgba(227, 6, 19, 0.3) !important; width: 100% !important;
}
.hs-button:hover, input[type="submit"]:hover {
  background: linear-gradient(135deg, #c80510 0%, #e63d4d 100%) !important; background-color: #c80510 !important;
  color: #fff !important; box-shadow: 0 8px 30px rgba(227, 6, 19, 0.4) !important;
}
.hs_submit { margin-top: 0.5rem !important; width: 100% !important; }
a { font-size: 0.85rem !important; color: #666 !important; }
input[type="checkbox"] { accent-color: #E30613 !important; }
.legal-consent-container, .hs-consent-container { display: flex !important; flex-direction: row !important; align-items: flex-start !important; gap: 0.5rem !important; padding-left: 0 !important; margin-left: 0 !important; margin-top: 1rem !important; margin-bottom: 1rem !important; }
.legal-consent-container input[type="checkbox"], .hs-consent-container input[type="checkbox"] { margin-top: 0.25rem !important; margin-left: 0 !important; flex-shrink: 0 !important; }
.legal-consent-container label, .legal-consent-container p, .hs-consent-container label, .hs-consent-container p { margin-left: 0 !important; padding-left: 0 !important; }
.hs-form-field:has(.legal-consent-container) .inputs, .hs-form-field:has(.legal-consent-container) .input, .hs-form-field:has(.hs-consent-container) .inputs, .hs-form-field:has(.hs-consent-container) .input,
.hs-form-field:has(.legal-consent-container) ul, .hs-form-field:has(.legal-consent-container) ol, .hs-form-field:has(.hs-consent-container) ul, .hs-form-field:has(.hs-consent-container) ol,
.hs-form-field:has(.legal-consent-container) li, .hs-form-field:has(.hs-consent-container) li { padding-left: 0 !important; margin-left: 0 !important; list-style: none !important; }
.hs-form-field:has(.legal-consent-container) div, .hs-form-field:has(.hs-consent-container) div, .hs-form-field:has(.hs-richtext) div { padding-left: 0 !important; margin-left: 0 !important; }
@media (max-width: 768px) { .form-columns-2 { grid-template-columns: 1fr !important; } }
`;

const SUBJECT_PLACEHOLDER = 'Select a subject';
const BAD_PLACEHOLDERS = ['- -', '--', '-', ''];

function fixSubjectSelectPlaceholder(doc: Document) {
    try {
        doc.querySelectorAll('select').forEach((select) => {
            const first = select.options[0];
            if (!first) return;
            const text = first.textContent?.trim() ?? '';
            if (BAD_PLACEHOLDERS.includes(text) || text.length <= 2) {
                first.textContent = SUBJECT_PLACEHOLDER;
            }
        });
    } catch {
        // ignore
    }
}

const CONSENT_SPACING = '1rem';

/** Remove left indent and set equal vertical spacing for consent checkbox row(s) */
function alignConsentCheckboxRow(doc: Document) {
    try {
        const container = doc.getElementById('hubspot-form-container') ?? doc.body;
        const form = container.querySelector('form, .hs-form');
        if (!form) return;
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        for (const input of checkboxes) {
            const label = (input.closest('label') ?? doc.querySelector(`label[for="${(input as HTMLInputElement).id}"]`)) ?? input.parentElement;
            const labelText = (label?.textContent ?? '').toLowerCase();
            if (!labelText.includes('agree') && !labelText.includes('consent') && !labelText.includes('communication') && !labelText.includes('store and process')) continue;
            let el: HTMLElement | null = input.parentElement;
            while (el && el !== form && el !== container) {
                (el as HTMLElement).style.setProperty('padding-left', '0', 'important');
                (el as HTMLElement).style.setProperty('margin-left', '0', 'important');
                el = el.parentElement;
            }
            (input as HTMLElement).style.setProperty('margin-left', '0', 'important');
            if (label && label instanceof HTMLElement) {
                label.style.setProperty('margin-left', '0', 'important');
                label.style.setProperty('padding-left', '0', 'important');
            }
        }
        equalizeConsentSpacing(doc);
    } catch {
        // ignore
    }
}

/** Force equal space above and below the "I agree to receive other communications" checkbox row */
function equalizeConsentSpacing(doc: Document) {
    try {
        const form = doc.querySelector('#hubspot-form-container form, #hubspot-form-container .hs-form, form, .hs-form');
        if (!form) return;
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        for (const input of checkboxes) {
            const label = (input.closest('label') ?? doc.querySelector(`label[for="${(input as HTMLInputElement).id}"]`)) ?? input.parentElement;
            const labelText = (label?.textContent ?? '').toLowerCase();
            if (!labelText.includes('agree') || !labelText.includes('communication')) continue;
            let row: HTMLElement | null = input.parentElement;
            while (row && row !== form) {
                if (row.previousElementSibling && row.nextElementSibling) break;
                row = row.parentElement;
            }
            if (!row || row === form) row = input.closest('.legal-consent-container, .hs-consent-container') ?? input.parentElement;
            if (row && row instanceof HTMLElement) {
                row.style.setProperty('margin-top', CONSENT_SPACING, 'important');
                row.style.setProperty('margin-bottom', CONSENT_SPACING, 'important');
                const next = row.nextElementSibling;
                if (next && next instanceof HTMLElement) {
                    next.style.setProperty('margin-top', '0', 'important');
                }
            }
            break;
        }
    } catch {
        // ignore
    }
}

function injectStylesIntoIframe(container: HTMLElement) {
    const iframe = container.querySelector('iframe');
    if (!iframe?.contentDocument) return false;
    try {
        const doc = iframe.contentDocument;
        const style = doc.createElement('style');
        style.textContent = HUBSPOT_IFRAME_CSS;
        (doc.head || doc.documentElement).appendChild(style);
        fixSubjectSelectPlaceholder(doc);
        alignConsentCheckboxRow(doc);
        return true;
    } catch {
        return false;
    }
}

function loadHubSpotForm() {
    if (typeof window !== 'undefined' && (window as Window & { hbspt?: { forms: { create: (opts: Record<string, unknown>) => void } } }).hbspt?.forms?.create) {
        (window as Window & { hbspt: { forms: { create: (opts: Record<string, unknown>) => void } } }).hbspt.forms.create({
            portalId: '245019687',
            formId: '8f5f717c-be11-4c73-be5c-1f4828371f10',
            region: 'na2',
            target: '#hubspot-form-container',
            css: '',
        });
    }
}

export default function ContactForm() {
    const injectedRef = useRef(false);

    useEffect(() => {
        const container = document.getElementById('hubspot-form-container');
        if (!container || injectedRef.current) return;

        const tryInject = () => {
            if (injectedRef.current) return;
            if (injectStylesIntoIframe(container)) {
                injectedRef.current = true;
                return;
            }
            const hasIframe = container.querySelector('iframe');
            const hasForm = container.querySelector('.hs-form, form');
            if (hasForm && !hasIframe) {
                fixSubjectSelectPlaceholder(document);
                injectedRef.current = true;
                return;
            }
        };

        const runFormFixes = () => {
            const iframe = container.querySelector('iframe');
            const doc = iframe?.contentDocument ?? document;
            fixSubjectSelectPlaceholder(doc);
            alignConsentCheckboxRow(doc);
        };

        tryInject();
        const t1 = window.setTimeout(tryInject, 800);
        const t2 = window.setTimeout(tryInject, 2000);
        const pt1 = window.setTimeout(runFormFixes, 500);
        const pt2 = window.setTimeout(runFormFixes, 1500);
        const pt3 = window.setTimeout(runFormFixes, 3000);
        const pt4 = window.setTimeout(runFormFixes, 4000);
        const observer = new MutationObserver(() => {
            tryInject();
            runFormFixes();
        });
        observer.observe(container, { childList: true, subtree: true });

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(pt1);
            clearTimeout(pt2);
            clearTimeout(pt3);
            clearTimeout(pt4);
            observer.disconnect();
        };
    }, []);

    return (
        <section className={styles.contactForm}>
            <Script
                src="//js-na2.hsforms.net/forms/embed/v2.js"
                strategy="afterInteractive"
                onLoad={loadHubSpotForm}
            />
            <div className="container">
                <div className={styles.formWrapper}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.title}>Send Us a Message</h2>
                        <p className={styles.subtitle}>
                            Fill out the form below and we&apos;ll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className={styles.hubspotFormWrap}>
                        <div id="hubspot-form-container" />
                    </div>
                </div>
            </div>
        </section>
    );
}
