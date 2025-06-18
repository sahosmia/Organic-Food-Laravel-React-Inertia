import React from 'react'
import PageBanner from '../component/tools/PageBanner';
import Teams from '../component/Teams';

function Team() {
  const teams = [
    {
      src: "/img/team/two.jpg",
      name: "Giovani Bacardo",
      title: "Farmar",
      facebook: "",
      instragram: "",
    },
    {
      src: "/img/team/three.jpg",
      name: "Giovani Bacardo",
      title: "Detective",
      facebook: "",
      instragram: "",
    },
    {
      src: "/img/team/five.jpg",
      name: "Giovani Bacardo",
      title: "Designer",
      facebook: "",
      instragram: "",
    },
    {
      src: "/img/team/six.jpg",
      name: "Giovani Bacardo",
      title: "Designer",
      facebook: "",
      instragram: "",
    },
    {
      src: "/img/team/one.jpg",
      name: "Giovani Bacardo",
      title: "Designer",
      facebook: "",
      instragram: "",
    },
    {
      src: "/img/team/four.jpg",
      name: "Giovani Bacardo",
      title: "Designer",
      facebook: "",
      instragram: "",
    },
  ];
  return (
    <div>
      <PageBanner bg="bg-banner-team" title="Team" />
      <div className="">
        <Teams teams={teams}/>
      </div>
    </div>
  );
}

export default Team