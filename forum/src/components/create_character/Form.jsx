import React, { useState } from "react";
import CharacterInfo from "./CharacterInfo";
import ChooseFandom from "./ChooseFandom";
import PreviewInfo from "./PreviewInfo";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function Form() {
	const [page, setPage] = useState(0);
	const [formData, setFormData] = useState({
		fandom_name: "",
		existing_fandom: '',
		name: "",
		avatar: "",
		description: ""
	})

	const navigate = useNavigate()
	const sendInfo = () => {
		console.log(formData)
		Swal.fire({
			width: 350,
			position: 'top',
			text: 'Ваша анкета направлена на модерацию! Как только она будет одобрена, иконка персонажа отобразится в профиле!',
			icon: 'success'
		})
		// navigate(`/`)
	}

	return (
		<div className='create-new-epi'>

			{page === 0 ? <ChooseFandom formData={formData} setFormData={setFormData} /> : page === 1 ? <CharacterInfo formData={formData} setFormData={setFormData} /> : page === 2 ? <PreviewInfo formData={formData} /> : ''}

			<div className="create-new-epi__buttons">
				{page !== 0 ?
					<button className="btns btns-create" onClick={() => setPage((currPage) => currPage - 1)}> Назад </button>
					: ''}

				{page !== 2 ?
					<button className="btns btns-create" onClick={() => setPage((currPage) => currPage + 1)}
					> Вперед </button>

					: <button className="btns btns-create" onClick={sendInfo}
					> Отправить </button>
				}
			</div>
		</div>
	)

}

export default Form;