import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { type TImage } from "../../types/image.types";

const ItemTypes = {
  IMAGE : "image",
};
const ImageCard = ({
  image,
  index,
  moveImage,
  baseUrl,
}: {
  image: TImage;
  index: number;
  moveImage: (from: number, to: number) => void;
  baseUrl: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`relative group rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl transition duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <img
        src={`${baseUrl}`}
        alt={image.title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white font-semibold text-sm truncate">
          {image.title}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;