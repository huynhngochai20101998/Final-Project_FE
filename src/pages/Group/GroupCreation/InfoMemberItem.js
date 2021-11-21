import React from "react";
import "./infoMemberItem.scss";

const InfoMemberItem = () => {
  const listMember = [
    {
      name: "Huỳnh Ngọc Hải",
      age: "22",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aceros feugiat turpis cursus vestibulum. Vivamus id auctor lectus. Nullam cursus interdum dolor, sed aliquam nibh luctus at. Aliquam erat volutpat. Suspendisse in sapien vitae nisl accumsan lobortis. Nulla sediaculis turpis, a egestas nibh.",
      listTime: [
        "T2 : (7:00-21:00)",
        "T3 : (7:00-21:00)",
        "T4 : (7:00-21:00)",
        "T7 : (7:00-21:00)"
      ]
    },
    {
      name: "Huỳnh Ngọc Hải",
      age: "22",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aceros feugiat turpis cursus vestibulum. Vivamus id auctor lectus. Nullam cursus interdum dolor, sed aliquam nibh luctus at. Aliquam erat volutpat. Suspendisse in sapien vitae nisl accumsan lobortis. Nulla sediaculis turpis, a egestas nibh.",
      listTime: [
        "T2 : (7:00-21:00)",
        "T3 : (7:00-21:00)",
        "T4 : (7:00-21:00)",
        "T7 : (7:00-21:00)"
      ]
    },
    {
      name: "Huỳnh Ngọc Hải",
      age: "22",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aceros feugiat turpis cursus vestibulum. Vivamus id auctor lectus. Nullam cursus interdum dolor, sed aliquam nibh luctus at. Aliquam erat volutpat. Suspendisse in sapien vitae nisl accumsan lobortis. Nulla sediaculis turpis, a egestas nibh.",
      listTime: [
        "T2 : (7:00-21:00)",
        "T3 : (7:00-21:00)",
        "T4 : (7:00-21:00)",
        "T7 : (7:00-21:00)"
      ]
    },
    {
      name: "Huỳnh Ngọc Hải",
      age: "22",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aceros feugiat turpis cursus vestibulum. Vivamus id auctor lectus. Nullam cursus interdum dolor, sed aliquam nibh luctus at. Aliquam erat volutpat. Suspendisse in sapien vitae nisl accumsan lobortis. Nulla sediaculis turpis, a egestas nibh.",
      listTime: [
        "T2 : (7:00-21:00)",
        "T3 : (7:00-21:00)",
        "T4 : (7:00-21:00)",
        "T7 : (7:00-21:00)"
      ]
    },
    {
      name: "Huỳnh Ngọc Hải",
      age: "22",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aceros feugiat turpis cursus vestibulum. Vivamus id auctor lectus. Nullam cursus interdum dolor, sed aliquam nibh luctus at. Aliquam erat volutpat. Suspendisse in sapien vitae nisl accumsan lobortis. Nulla sediaculis turpis, a egestas nibh.",
      listTime: [
        "T2 : (7:00-21:00)",
        "T3 : (7:00-21:00)",
        "T4 : (7:00-21:00)",
        "T7 : (7:00-21:00)"
      ]
    }
  ];

  const memberItem = listMember.map((item, index) => {
    return (
      <div key={index} className="content-item grid-container">
        <div className="content-item-column item-name">{item.name}</div>
        <div className="content-item-column item-age">{`${item.age} Tuổi`}</div>
        <div className="content-item-column item-intro">{item.intro}</div>
        <div className="content-item-column item-schedule">
          <ol>
            {item.listTime.map((time, index2) => {
              return <li key={index2}>{time}</li>;
            })}
          </ol>
        </div>
        <div className="content-item-column item-delete">
          <div className="btn-delete">
            <i className="fas fa-times" />
          </div>
        </div>
      </div>
    );
  });

  return memberItem;
};

export default InfoMemberItem;
