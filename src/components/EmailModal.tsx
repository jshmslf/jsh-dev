import React, { useEffect, useState } from "react";
import '../styles/EmailModal.scss'
import { IoClose } from "react-icons/io5";
import emailjs from "@emailjs/browser";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EmailModal = ({ isOpen, onClose }: Props) => {
    const now = new Date();

    const formattedTime = now.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<"success" | "error" | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: FormErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }
        
        return newErrors;
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setStatus("error");
            return;
        }

        try {
            setLoading(true);

            await emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    subject: form.subject,
                    message: form.message,
                    time: formattedTime,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus("success");

            setForm({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            
            setErrors({});
        } catch (error) {
            console.error("Email send error:", error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
            <div className="modal">
                <button className="close-btn" onClick={onClose}>
                    <IoClose size={27} opacity={0.5}/>
                </button>
                
                <div className="modal-header">
                    <h2 className="modal-title">Send me a message</h2>
                    <span className="modal-subtitle">I&apos;ll get back to you soon.</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Name*</label>
                        <input
                            name="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Email*</label>
                        <input
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input
                            name="phone"
                            placeholder="+1 123 456 7890"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Subject</label>
                        <input
                            name="subject"
                            placeholder="What's this about?"
                            value={form.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Message</label>
                        <textarea
                            name="message"
                            placeholder="Type your message..."
                            value={form.message}
                            rows={5}
                            onChange={handleChange}
                        />
                    </div>

                    {status === "success" && (
                        <div className="form-status success">
                            Message sent successfully!
                        </div>
                    )}

                    {status === "error" && (
                        <div className="form-status error">
                            Please fill up required fields.
                        </div>
                    )}


                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default EmailModal;