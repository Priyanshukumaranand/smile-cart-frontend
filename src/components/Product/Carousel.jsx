import { useState } from "react";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { useParams } from "react-router-dom";
import { append } from "ramda";

const Carousel = () => {
  const { slug } = useParams();
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentIndex(previousIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <img
        alt={title}
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            className="neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
