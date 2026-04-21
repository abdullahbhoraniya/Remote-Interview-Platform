import React from 'react'
import OAuth from '../Components/OAuth'

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center px-4">
      
      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-3xl border border-base-200 p-8 space-y-6">

        {/* LOGO / TITLE */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono">
            Talent IQ
          </h1>
          <p className="text-base-content/60">
            Continue your coding journey 🚀
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="flex justify-center">
          <OAuth />
        </div>

        {/* DIVIDER */}
        <div className="divider text-sm text-base-content/50">
          secure login
        </div>

        {/* FOOTER TEXT */}
        <p className="text-center text-sm text-base-content/60">
          By continuing, you agree to our terms and privacy policy.
        </p>

      </div>
    </div>
  )
}

export default Login