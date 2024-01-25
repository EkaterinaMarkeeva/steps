import { FC, useState } from "react";
import { Table, TableItemType } from "../table/Table";
import './style/feedbackStyle.css';

type FormType = {
  date: string,
  distance: string
}

export type DataType = TableItemType[];

export const Feedback: FC = () => {
  const [form, setForm] = useState<FormType>({ 
    date: '',
    distance: ''
  });

  const [data, setData] = useState<DataType>([]);

  const onClickChange = (idx: number) => {
    const { date,  distance } = data[idx];
    const newDate: string = changeFormatDate(date);

    setForm((prev) => ({ ...prev, date: newDate, distance: distance }));
    onClickDelete(idx);
  }

  const onClickDelete = (idx: number) => {
    const newData = data.slice();

    newData.splice(idx, 1);

    setData(newData);
  }

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const item = data.findIndex(elem => {
      const newDate: string = changeFormatDate(elem.date);
      
      return newDate === form.date;
    });

    if (item > -1) {
      const newDistance: string = String(Number(data[item].distance) + Number(form.distance));
      const newDate: string = form.date.split('.').reverse().join('-');
      const newItem: TableItemType = {
        date: new Date(newDate),
        distance: newDistance
      }

      const newData = data.slice();

      newData.splice(item, 1, newItem);

      setData(newData.sort((a,b) => a.date < b.date ? 1 : -1 ));
    } else {
      const newDate: string = form.date.split('.').reverse().join('-');
      const newItem: TableItemType = {
        date: new Date(newDate),
        distance: form.distance
      }

      setData((prev) => ( prev.concat(newItem).sort((a,b) => a.date < b.date ? 1 : -1 ))); 
    }

    setForm((prev) => ({ ...prev, date: '', distance: ''}));
  }

  const changeFormatDate = (date: Date): string => {
    const day: string = String(date.getDate()).length === 1 ? '0' + date.getDate() : String(date.getDate());
    const month: string = String(date.getMonth()).length === 1 ? '0' + (date.getMonth() + 1) : String(date.getMonth() + 1);
    const newDate: string = day + '.' + month + '.' + date.getFullYear();

    return newDate;
  }

  return (
    <>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form_content">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input type="text" id="date" name="date" className="input" value={form.date} onChange={handleFormChange} />
        </div>
        <div className="form_content">
          <label htmlFor="distance">Пройдено км</label>
          <input type="text" id="distance" name="distance" className="input" value={form.distance} onChange={handleFormChange} />
        </div>
        <button className="btn form_btn">OK</button>
      </form>
      <div className="table">
        <div className="table_header">
          <h2>Дата (ДД.ММ.ГГ)</h2>
          <h2>Пройдено км</h2>
          <h2>Действия</h2>
        </div>
        {data.length > 0 && <Table data={data} onClickChange={onClickChange} onClickDelete={onClickDelete} />}
      </div>
    </>
  )
}
