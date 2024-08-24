import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import AssociationCard3 from "../../../../Front_Association/Component/MuiCustomComponent/AssociationCard3";
import { AssociationModel } from "../../../../Services/Types/AssociationModels";
import Variable from "../../../../Variable";
import AssociationServices from "../../../../Services/AssociationServices";

const AssociationSlick = () => {
  const [associationList, setAssociationList] = useState<AssociationModel[]>([]);
  
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    Initializepage(user.user.phone);
  }, []);

  const Initializepage = (phone: string) => {
    AssociationServices.GetMyAssociations(phone)
      .then((response) => {
        
        console.log(response.data);
        setAssociationList(response.data);
      })
      .catch((error) => {});
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 768, // or whatever breakpoint you want
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
    ],
    
  };
  return (
    <div className="w-full h-full ">
      <Slider  {...settings}  >
        {associationList.map((association, index) => (
            <div key={index} className="h-full flex">
                <AssociationCard3 {...association} />
            </div>
        ))}
      </Slider>
      
    </div>
  );
};

export default AssociationSlick;
