"use client"

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

import React, { useRef, useState } from 'react'

import upload from "@/app/icons/upload.svg"
import Image from "next/image";

import { toast } from "sonner"

const { env: { imagekit: { publicKey, urlEndpoint }}} = config;


const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token }
  } catch(error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed:${error.message}`)
    }
  }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  const onError = (error: unknown) => {
    console.log(error)
    toast('Image upload failed')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath)
    toast(`Image uploaded successfully: ${res.filePath}`)
  }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <button className="upload-btn" onClick={(e) => {
        e.preventDefault();
        if(IKUploadRef.current) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          IKUploadRef.current?.click();
        }
      }}>
        <Image
          src={upload}
          alt='upload-icon'
          width={20}
          height={20}
          className="object-contain"
        />
      </button>
      <p className="text-base text-light-100">Upload a File</p>
      {file && <p className="upload-filename">{file.filePath}</p>}
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload