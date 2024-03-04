import { CreateDescription } from "@/app/actions"
import Counter from "@/app/components/Counter"
import CreationBottomBar from "@/app/components/CreationBottomBar"
import { Card, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const DescriptionPage = ({ params }: { params: { id: string }}) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-light transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-5 mb-36">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>

          <div className="gap-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per Night in USD"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Image</Label>
            <span className="text-gray-500 text-sm">Choose or drop the image</span>
            <Input
              name="image"
              type="file"
              required
              className="cursor-pointer"
            />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">How many guests do you want?</p>
                </div>
                <Counter name="guest" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">How many rooms do you have?</p>
                </div>
                <Counter name="room" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreationBottomBar />
      </form>
    </>
  )
}

export default DescriptionPage  
