"use client";

import { useState } from 'react';
import { Send, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section className={styles.contactForm}>
            <div className="container">
                <div className={styles.formWrapper}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.title}>Send Us a Message</h2>
                        <p className={styles.subtitle}>
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>
                                    <User size={18} />
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    <Mail size={18} />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="phone" className={styles.label}>
                                    <Phone size={18} />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="company" className={styles.label}>
                                    <Building2 size={18} />
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Your Company"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="subject" className={styles.label}>
                                <MessageSquare size={18} />
                                Subject *
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className={styles.select}
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="services">Services & Solutions</option>
                                <option value="partnership">Partnership Opportunities</option>
                                <option value="support">Technical Support</option>
                                <option value="careers">Career Opportunities</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="message" className={styles.label}>
                                <MessageSquare size={18} />
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className={styles.textarea}
                                placeholder="Tell us about your project or inquiry..."
                            />
                        </div>

                        {submitStatus === 'success' && (
                            <div className={styles.successMessage}>
                                ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className={styles.errorMessage}>
                                ✗ Something went wrong. Please try again later.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles.submitBtn}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
