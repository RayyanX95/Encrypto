import React from "react";

const HowToUse = () => {
  return (
    <div className="container p-5 pt-15 bg-white">
      <div className="row p-20">
        <article>
          <h1>How to use:</h1>
          <p className='col-10 mx-auto text-black-50'>
            For faster mobile-friendly development, use responsive display
            classes for showing and hiding elements by device. Avoid creating
            entirely different versions of the same site, instead hide elements
            responsively for each screen size. To hide elements simply use the
            .d-none class or one of the .none classes for any responsive screen
            variation. To show an element only on a given interval of screen
            sizes you can combine one .d-*-none class with a .d-*-* class, for
            example .d-none .d-md-block .d-xl-none will hide the element for all
            screen sizes except on medium and large devices.
          </p>
        </article>
      </div>
    </div>
  );
};

export default HowToUse;
