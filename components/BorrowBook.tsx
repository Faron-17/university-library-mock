'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

import bookIcon from '@/app/icons/book.svg'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { borrowBook } from '@/lib/book'

interface Props {
  bookId: string,
  userId: string,
  borrowingEligibility: {
    isEligible: boolean,
    message: string
  }
}

const BorrowBook = ({ bookId, userId, borrowingEligibility: {isEligible, message} }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async() => {
    if(!isEligible) {
      toast(message)
    }

    setBorrowing(true);
      const result = await borrowBook({bookId, userId});

      if(result.success) {
        toast('Book borrowed successfully')
        router.push('/my-profile')
      } else {
        toast('An error occurred while borrowing the book')
      }
      
    try {
      
    } catch {
      toast('An error occurred while borrowing the book')
    } finally {
      setBorrowing(false)
    }
  }
  return (
    <Button
      className='book-overview_btn'
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image
        src={bookIcon}
        alt="book"
        width={20}
        height={20}
      />
      <p className='font-bebas-neue text-xl text-dark-100'>{borrowing ? "Borrowing ..." : "Borrow Book"}</p>
    </Button>
  )
}

export default BorrowBook