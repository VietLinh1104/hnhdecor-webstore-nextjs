"use client"
import { ProductDetailScreen } from '@/screens/ProductDetailScreen'

import { useParams } from "next/navigation";


export default function Home() {
  const params = useParams();
    const documentId = params.id as string;
    
  return <ProductDetailScreen documentId={documentId}/>
}