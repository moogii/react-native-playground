import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Calligraphy } from "../../../components";
import { Card } from "./Card";

const OPPORTUNITIES = [
  {
    id: 0,
    title: 'Research assistance - Neuroscience',
    location: 'Houston, Tx',
    company: 'Kutsanda',
    type: 'Full time',
  },
  {
    id: 1,
    title: 'Mobile specialist',
    location: 'Houston, Tx',
    company: 'Microsoft',
    type: 'Full time',
  },
  {
    id: 2,
    title: 'React developer',
    location: 'Houston, Tx',
    company: 'AT&T',
    type: 'Part time',
  },
  {
    id: 3,
    title: 'Research assistance - Neuroscience',
    location: 'Houston, Tx',
    company: 'Kutsanda',
    type: 'Full time',
  },
  {
    id: 4,
    title: 'Research assistance - Neuroscience',
    location: 'Houston, Tx',
    company: 'Kutsanda',
    type: 'Full time',
  },
  {
    id: 5,
    title: 'Macro economist',
    location: 'Houston, Tx',
    company: 'Master Card',
    type: 'Full time',
  },
]

export interface IOpportunity {
  id: number;
  title: string;
  location: string;
  company: string;
  type: string;
}

export const Swiper: FC = () => {
  const [opportunities, setOpportunities] = useState<IOpportunity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [thirdIndex, setThirdIndex] = useState(2);

  useEffect(() => {
    setOpportunities(OPPORTUNITIES);
  }, []);

  useEffect(() => {
    if (currentIndex === opportunities.length - 3) {
      // TODO: get data from server
    }
  }, [currentIndex, opportunities])

  const onSwiped = (id: number, index: number, isLeft: boolean) => {
    setCurrentIndex(i => i + 1);
    // TODO: based on the swiping direction do whatever you want
    if (!isLeft) { }

  }

  const onSwipeFirst = (id: number, index: number, isLeft: boolean) => {
    onSwiped(id, index, isLeft);
    setFirstIndex(i => i + 3);
  }

  const onSwipeSecond = (id: number, index: number, isLeft: boolean) => {
    onSwiped(id, index, isLeft);
    setSecondIndex(i => i + 3);
  }

  const onSwipeThird = (id: number, index: number, isLeft: boolean) => {
    onSwiped(id, index, isLeft);
    setThirdIndex(i => i + 3);
  }

  const renderFirst = () => {
    if (opportunities[firstIndex] === undefined) {
      return;
    }
    return (
      <Card
        opportunity={opportunities[firstIndex]}
        zIndex={(currentIndex + 2) % 3}
        index={firstIndex}
        swiped={onSwipeFirst} />
    )
  }

  const renderSecond = () => {
    if (opportunities[secondIndex] === undefined) {
      return;
    }
    return (
      <Card
        zIndex={(currentIndex + 1) % 3}
        opportunity={opportunities[secondIndex]}
        index={secondIndex}
        swiped={onSwipeSecond} />
    )
  }

  const renderThird = () => {
    if (opportunities[thirdIndex] === undefined) {
      return;
    }
    return (
      <Card
        zIndex={(currentIndex) % 3}
        opportunity={opportunities[thirdIndex]}
        index={thirdIndex}
        swiped={onSwipeThird} />
    )
  }


  return (
    <View style={{ padding: 20, height: 500 }}>
      <Calligraphy size={24} lineHeight={50}>My <Calligraphy weight='bold'>Opportunities</Calligraphy></Calligraphy>
      <View>
        {opportunities.length > 0 && (
          <>
            {renderFirst()}
            {renderSecond()}
            {renderThird()}
          </>
        )}
        {currentIndex === opportunities.length && (
          <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}><Calligraphy>Try again later</Calligraphy></View>
        )}
      </View>
    </View>
  );
}
