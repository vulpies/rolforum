import React, { useState } from "react";
import CharacterInfo from "./CharacterInfo"
import ChooseFandom from "./ChooseFandom"
import PreviewInfo from "./PreviewInfo"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { commonPostReq } from "../../helpers/commonFetch"
import {useTranslation} from "react-i18next";

function Form() {
	const { t } = useTranslation();
	const [page, setPage] = useState(0);
	const [formData, setFormData] = useState({
		fandom_name: "",
		fandom_id: "",
		existing_fandom: '',
		name: "",
		avatar: "",
		description: ""
	})

	const navigate = useNavigate()

	const sendInfo = () => {
		try {
			commonPostReq('https://api.postscriptum.games/v1/profile/character-create', formData)
		} catch (err) {
			console.log(err)
		}
		console.log(formData)
		Swal.fire({
			width: 350,
			position: 'top',
			text: t("components.createCharacter.accepted"),
			icon: 'success'
		})
		navigate(`/index`)
	}

	return (
		<div className='create-new-epi'>

			{page === 0 ? <ChooseFandom formData={formData} setFormData={setFormData} /> : page === 1 ? <CharacterInfo formData={formData} setFormData={setFormData} /> : page === 2 ? <PreviewInfo formData={formData} /> : ''}

			<div className="create-new-epi__buttons">
				{page !== 0 ?
					<button className="btns btns-create" onClick={() => setPage((currPage) => currPage - 1)}> {t("components.createCharacter.back")} </button>
					: ''}

				{page !== 2 ?
					<button className="btns btns-create" onClick={() => setPage((currPage) => currPage + 1)}
					> {t("components.createCharacter.forward")} </button>

					: <button className="btns btns-create"
						onClick={sendInfo}
						disabled={formData.name === '' || formData.avatar === '' || formData.description === ''}
					> {t("components.createCharacter.submit")} </button>
				}
			</div>
		</div>
	)

}

export default Form;