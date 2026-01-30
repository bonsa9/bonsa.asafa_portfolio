"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProfileImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string
}

export function ProfileImage({
    src,
    alt,
    fallbackSrc = "/placeholder.svg?height=150&width=150",
    className,
    ...props
}: ProfileImageProps) {
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <Image
            {...props}
            src={imgSrc || fallbackSrc}
            alt={alt}
            className={cn("object-cover", className)}
            onError={() => {
                setImgSrc(fallbackSrc)
            }}
        />
    )
}
