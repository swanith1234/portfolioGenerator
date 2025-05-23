import React from "react";
import ReviewCard from "../components/ReviewCard";
import customer1 from "../assets/customer1.jpeg";
import customer2 from "../assets/customer2.svg";

const reviews = [
  {
    imgURL: customer1,
    customerName: "Morich Brown",
    rating: 4.5,
    feedback:
      "Using this portfolio generator was a game-changer for me! I was able to create a professional portfolio in no time.",
  },
  {
    imgURL: customer2,
    customerName: "Lota Mongeskar",
    rating: 4.5,
    feedback:
      "The templates are beautifully designed and so easy to customize. My portfolio stands out thanks to this tool!",
  },
];

const CustomerReviews = () => {
  return (
    <>
      <section className="max-container py-8">
        <h3 className="font-palanquin text-center text-4xl font-bold">
          What Our
          <span className="text-amber-600"> Customers </span>
          Say?
        </h3>
        <p className="info-text m-auto  mt-4 max-w-lg text-center ">
          Hear genuine stories from our satisfied customers about their
          exceptional experiences with us.
        </p>

        <div className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
          {reviews.map((review) => (
            <ReviewCard
              key={review.customerName}
              imgURL={review.imgURL}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CustomerReviews;
