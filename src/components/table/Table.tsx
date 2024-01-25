import { FC } from "react";
import { DataType } from "../feedback/Feedback";
import { ItemTable } from './ItemTable';
import './style/tableStyle.css';

export type TableItemType = {
  date: Date,
  distance: string
}

type TableType = { data: DataType, onClickChange: (idx: number) => void, onClickDelete: (idx: number) => void };

export const Table: FC<TableType> = (props) => {
  return (
    <div className="data">
      {props.data.map((item, index) => {
        return <ItemTable key={index} id={String(index)} data={item} onClickChange={() => props.onClickChange(index)} onClickDelete={() => props.onClickDelete(index)} />
      })}
    </div>
  )
}
