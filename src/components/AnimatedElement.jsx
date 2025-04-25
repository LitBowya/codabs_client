import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link']

const AnimatedElement = ({
                             children,
                             tag: Tag = 'div',
                             className = '',
                             animationProps = {},
                             ...restProps // For passing other attributes like src, alt, etc.
                         }) => {
    const elementRef = useRef(null)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                elementRef.current,
                animationProps.from || { opacity: 0, y: 50 },
                { ...animationProps.to }
            )
        }, elementRef)

        return () => ctx.revert()
    }, [animationProps])

    // Handle self-closing tags like <img />
    if (selfClosingTags.includes(Tag)) {
        return <Tag ref={elementRef} className={className} {...restProps} />
    }

    // Regular tags like <div>, <span>, <button>
    return (
        <Tag ref={elementRef} className={className} {...restProps}>
            {children}
        </Tag>
    )
}

export default AnimatedElement
