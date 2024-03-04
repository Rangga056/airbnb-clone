"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

const Counter = ({name}: {name: string}) => {
  const [amount, setAmount] = useState(0)

  const increase = () => {
    setAmount((prev) => prev + 1)
  }

  const decrease = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1)
    }
  }
  return (
    <div className="flex items-center gap-4">
      <input type="hidden" name={name} value={amount} />
      <Button
        onClick={decrease}
        variant="outline"
        size="icon"
        type="button" >
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button
        onClick={increase}
        variant="outline"
        size="icon"
        type="button" >
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  )
}

export default Counter  
