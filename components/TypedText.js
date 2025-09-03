"use client"

import React from 'react'
import { ReactTyped } from 'react-typed'

const TypedText = () => {
    return (
        <div>
            <p className="text-lg md:text-xl m-6">
                <span className="text-2xl font-bold text-rose-700">
                    <ReactTyped
                        strings={[
                            "Privacy-focused",
                            "Fast and Reliable",
                            "Secure and Simple",
                        ]}
                        typeSpeed={80}
                        backSpeed={50}
                        loop
                    />
                </span>
            </p>
        </div>
    )
}

export default TypedText