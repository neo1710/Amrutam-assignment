module.exports = {

"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}}),
"[project]/pages/login.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>AuthComponent
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-in.js [ssr] (ecmascript) <export default as LogIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [ssr] (ecmascript) <export default as UserPlus>");
'use client';
;
;
;
;
function AuthComponent() {
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: value
            }));
        if (errors[name]) {
            setErrors((prev)=>({
                    ...prev,
                    [name]: ''
                }));
        }
    };
    const validateForm = ()=>{
        const newErrors = {};
        if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
            newErrors.name = 'Name must be at least 2 characters long';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!isLogin) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
            if (!formData.password || !passwordRegex.test(formData.password)) {
                newErrors.password = 'Password must be at least 6 characters long and contain both letters and numbers';
            }
        } else {
            if (!formData.password) {
                newErrors.password = 'Password is required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setMessage('');
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin ? {
                email: formData.email,
                password: formData.password
            } : formData;
            const response = await fetch(`/api/users${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.msg);
                if (isLogin && data.token) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('userData', JSON.stringify(data.user));
                    // Redirect or update app state here
                    console.log('Login successful:', data);
                // Example: router.push('/dashboard');
                } else if (!isLogin) {
                    setIsLogin(true);
                    setFormData({
                        name: '',
                        email: '',
                        password: ''
                    });
                }
            } else {
                setMessage(data.msg || 'An error occurred');
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
            console.error('Auth error:', error);
        } finally{
            setIsLoading(false);
        }
    };
    const switchMode = ()=>{
        setIsLogin(!isLogin);
        setFormData({
            name: '',
            email: '',
            password: ''
        });
        setErrors({});
        setMessage('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "72acd9a1df58573e",
                children: ".container.jsx-72acd9a1df58573e{background:linear-gradient(135deg,#f0f9ff 0%,#e0e7ff 50%,#f3e8ff 100%);justify-content:center;align-items:center;min-height:100vh;padding:16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;display:flex}.main-content.jsx-72acd9a1df58573e{width:100%;max-width:400px}.header.jsx-72acd9a1df58573e{text-align:center;margin-bottom:32px}.logo.jsx-72acd9a1df58573e{background:linear-gradient(45deg,#2563eb,#7c3aed);border-radius:50%;justify-content:center;align-items:center;width:64px;height:64px;margin-bottom:16px;display:inline-flex}.title.jsx-72acd9a1df58573e{color:#111827;margin:0 0 8px;font-size:32px;font-weight:700}.subtitle.jsx-72acd9a1df58573e{color:#6b7280;margin:0}.form-card.jsx-72acd9a1df58573e{background:#fff;border:1px solid #f3f4f6;border-radius:16px;padding:32px;box-shadow:0 20px 25px -5px #0000001a,0 10px 10px -5px #0000000a}.form-content.jsx-72acd9a1df58573e{flex-direction:column;gap:24px;display:flex}.form-group.jsx-72acd9a1df58573e{flex-direction:column;display:flex}.label.jsx-72acd9a1df58573e{color:#374151;margin-bottom:8px;font-size:14px;font-weight:500;display:block}.input-wrapper.jsx-72acd9a1df58573e{position:relative}.input-icon.jsx-72acd9a1df58573e{color:#9ca3af;pointer-events:none;position:absolute;top:50%;left:12px;transform:translateY(-50%)}.input.jsx-72acd9a1df58573e{box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;width:100%;padding:12px 12px 12px 40px;font-size:16px;transition:all .2s;display:block}.input.jsx-72acd9a1df58573e:hover{border-color:#9ca3af}.input.jsx-72acd9a1df58573e:focus{border-color:#3b82f6;outline:none;box-shadow:0 0 0 3px #3b82f61a}.input.error.jsx-72acd9a1df58573e{background-color:#fef2f2;border-color:#ef4444}.password-input.jsx-72acd9a1df58573e{padding-right:48px}.password-toggle.jsx-72acd9a1df58573e{cursor:pointer;color:#9ca3af;background:0 0;border:none;transition:color .2s;position:absolute;top:50%;right:12px;transform:translateY(-50%)}.password-toggle.jsx-72acd9a1df58573e:hover{color:#6b7280}.error-text.jsx-72acd9a1df58573e{color:#ef4444;margin-top:8px;font-size:14px}.help-text.jsx-72acd9a1df58573e{color:#6b7280;margin-top:8px;font-size:12px}.submit-btn.jsx-72acd9a1df58573e{color:#fff;cursor:pointer;background:linear-gradient(45deg,#2563eb,#7c3aed);border:none;border-radius:8px;justify-content:center;align-items:center;width:100%;padding:12px 16px;font-size:16px;font-weight:500;transition:all .2s;display:flex}.submit-btn.jsx-72acd9a1df58573e:hover:not(:disabled){background:linear-gradient(45deg,#1d4ed8,#6d28d9);transform:translateY(-1px)}.submit-btn.jsx-72acd9a1df58573e:disabled{opacity:.5;cursor:not-allowed}.btn-icon.jsx-72acd9a1df58573e{margin-right:8px}.spinner.jsx-72acd9a1df58573e{border:2px solid #fff;border-top-color:#0000;border-radius:50%;width:20px;height:20px;margin-right:8px;animation:1s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}.message.jsx-72acd9a1df58573e{border-radius:8px;margin-top:16px;padding:16px;font-size:14px}.message.success.jsx-72acd9a1df58573e{color:#166534;background-color:#f0fdf4;border:1px solid #bbf7d0}.message.error.jsx-72acd9a1df58573e{color:#dc2626;background-color:#fef2f2;border:1px solid #fecaca}.switch-mode.jsx-72acd9a1df58573e{text-align:center;border-top:1px solid #f3f4f6;margin-top:24px;padding-top:24px}.switch-text.jsx-72acd9a1df58573e{color:#6b7280;font-size:14px}.switch-link.jsx-72acd9a1df58573e{color:#2563eb;cursor:pointer;background:0 0;border:none;margin-left:8px;font-weight:500;text-decoration:underline;transition:color .2s}.switch-link.jsx-72acd9a1df58573e:hover{color:#1d4ed8}.footer.jsx-72acd9a1df58573e{text-align:center;color:#9ca3af;margin-top:32px;font-size:14px}@media (width<=480px){.form-card.jsx-72acd9a1df58573e{padding:24px}.title.jsx-72acd9a1df58573e{font-size:28px}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-72acd9a1df58573e" + " " + "container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-72acd9a1df58573e" + " " + "main-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-72acd9a1df58573e" + " " + "header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-72acd9a1df58573e" + " " + "logo",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        size: 32,
                                        color: "white"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/login.tsx",
                                        lineNumber: 379,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "jsx-72acd9a1df58573e" + " " + "title",
                                    children: isLogin ? 'Welcome Back' : 'Create Account'
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.tsx",
                                    lineNumber: 381,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "jsx-72acd9a1df58573e" + " " + "subtitle",
                                    children: isLogin ? 'Sign in to your account' : 'Join us today'
                                }, void 0, false, {
                                    fileName: "[project]/pages/login.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/login.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-72acd9a1df58573e" + " " + "form-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                    onSubmit: handleSubmit,
                                    className: "jsx-72acd9a1df58573e" + " " + "form-content",
                                    children: [
                                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-72acd9a1df58573e" + " " + "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "name",
                                                    className: "jsx-72acd9a1df58573e" + " " + "label",
                                                    children: "Full Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "input-wrapper",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-72acd9a1df58573e" + " " + "input-icon",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/login.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "name",
                                                            name: "name",
                                                            value: formData.name,
                                                            onChange: handleInputChange,
                                                            placeholder: "Enter your full name",
                                                            className: "jsx-72acd9a1df58573e" + " " + `input ${errors.name ? 'error' : ''}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 19
                                                }, this),
                                                errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "error-text",
                                                    children: errors.name
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 394,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-72acd9a1df58573e" + " " + "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "email",
                                                    className: "jsx-72acd9a1df58573e" + " " + "label",
                                                    children: "Email Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "input-wrapper",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-72acd9a1df58573e" + " " + "input-icon",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/login.tsx",
                                                                lineNumber: 423,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "email",
                                                            id: "email",
                                                            name: "email",
                                                            value: formData.email,
                                                            onChange: handleInputChange,
                                                            placeholder: "Enter your email",
                                                            className: "jsx-72acd9a1df58573e" + " " + `input ${errors.email ? 'error' : ''}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 17
                                                }, this),
                                                errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "error-text",
                                                    children: errors.email
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 34
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 417,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-72acd9a1df58573e" + " " + "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    htmlFor: "password",
                                                    className: "jsx-72acd9a1df58573e" + " " + "label",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "input-wrapper",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-72acd9a1df58573e" + " " + "input-icon",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/login.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: showPassword ? 'text' : 'password',
                                                            id: "password",
                                                            name: "password",
                                                            value: formData.password,
                                                            onChange: handleInputChange,
                                                            placeholder: "Enter your password",
                                                            className: "jsx-72acd9a1df58573e" + " " + `input password-input ${errors.password ? 'error' : ''}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setShowPassword(!showPassword),
                                                            tabIndex: -1,
                                                            className: "jsx-72acd9a1df58573e" + " " + "password-toggle",
                                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/login.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 37
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/login.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 60
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/login.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 443,
                                                    columnNumber: 17
                                                }, this),
                                                errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "error-text",
                                                    children: errors.password
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 465,
                                                    columnNumber: 37
                                                }, this),
                                                !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-72acd9a1df58573e" + " " + "help-text",
                                                    children: "Password must be at least 6 characters with letters and numbers"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/login.tsx",
                                                    lineNumber: 467,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isLoading,
                                            className: "jsx-72acd9a1df58573e" + " " + "submit-btn",
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "jsx-72acd9a1df58573e" + " " + "spinner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/login.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Processing..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    isLogin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$in$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogIn$3e$__["LogIn"], {
                                                        size: 20,
                                                        className: "btn-icon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/login.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                        size: 20,
                                                        className: "btn-icon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/login.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 23
                                                    }, this),
                                                    isLogin ? 'Sign In' : 'Create Account'
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, this),
                                        message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-72acd9a1df58573e" + " " + `message ${message.includes('successfully') || message.includes('Success') ? 'success' : 'error'}`,
                                            children: message
                                        }, void 0, false, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 498,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/login.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-72acd9a1df58573e" + " " + "switch-mode",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-72acd9a1df58573e" + " " + "switch-text",
                                            children: isLogin ? "Don't have an account?" : 'Already have an account?'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 510,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: switchMode,
                                            className: "jsx-72acd9a1df58573e" + " " + "switch-link",
                                            children: isLogin ? 'Create one' : 'Sign in'
                                        }, void 0, false, {
                                            fileName: "[project]/pages/login.tsx",
                                            lineNumber: 513,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/login.tsx",
                                    lineNumber: 509,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/login.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-72acd9a1df58573e" + " " + "footer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "jsx-72acd9a1df58573e",
                                children: "© 2025 Your App Name. All rights reserved."
                            }, void 0, false, {
                                fileName: "[project]/pages/login.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/login.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/login.tsx",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/login.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__874ac7dc._.js.map