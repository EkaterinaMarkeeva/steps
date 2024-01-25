import { FC } from "react";
import { TableItemType } from "./Table";

type ItemType = { id: string, data: TableItemType, onClickChange: React.MouseEventHandler<HTMLButtonElement>, onClickDelete: React.MouseEventHandler<HTMLButtonElement> } ;

export const ItemTable: FC<ItemType> = (props) => {
  return (
    <div className="tabel-item" id={props.id}>
      <p>{String(props.data.date.getDate()).length === 1 ? '0' + props.data.date.getDate() : props.data.date.getDate()}.{String(props.data.date.getMonth()).length === 1 ? '0' + (props.data.date.getMonth() + 1) : props.data.date.getMonth() + 1}.{props.data.date.getFullYear()}</p>
      <p>{props.data.distance}</p>
      <div className="buttons">
        <button className="btn change" onClick={props.onClickChange}>&#9998;</button>
        <button className="btn delete" onClick={props.onClickDelete}>&#10008;</button>
      </div>
    </div>
  )
}
