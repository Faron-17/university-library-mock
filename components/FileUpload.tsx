"use client"

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";

import React, { useRef, useState } from 'react'

import upload from "@/app/icons/upload.svg"
import Image from "next/image";

import { toast } from "sonner"
import { cn } from "@/lib/utils";

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

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string
}

const FileUpload = ({ 
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null}>({filePath: value || null})
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  };

  const onError = (error: unknown) => {
    console.log(error)
    toast(`${type} upload failed`)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath)
    toast(`${type} uploaded successfully: ${res.filePath}`)
  }

  const onValidate = (file: File) => {
    if(type === 'image') {
      if(file.size > 20 * 1024 * 1024) {
        toast('File size too large. Please upload a file that is less than 20MB in size')
        return false
      }
    } else if(type === 'video') {
      if(file.size > 50 * 1024 * 1024) {
        toast('File size too large. Please upload a file that is less than 50MB in size')
        return false
      } 
    }
    return true
  }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round( (loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button className={cn('upload-btn', styles.button)} onClick={(e) => {
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
        <p className={cn('text-base text-light-100', styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file && (
        (type === 'image' ? 
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          /> : type === 'video' ?
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          /> : null
        )
      )}
    </ImageKitProvider>
  )
}

export default FileUpload