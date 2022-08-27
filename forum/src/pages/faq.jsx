import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import faqInfo from '../static_info/faq'
import { Helmet } from "react-helmet";
import { useSelector } from 'react-redux';
import faqEn from '../static_info/faq_en';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
	const language = useSelector((state) => state.usersReducer?.user[0]?.language)
	const [info, setInfo] = useState()
	const { t } = useTranslation();

	useEffect(() => {
		if (language === 'ru') {
			setInfo(faqInfo)
		} else {
			setInfo(faqEn)
		}
	}, [language])

	const elem = info?.map((item, i) => {
		return <div key={i} className='faq-common'>
			<p className='faq-title'><span className='faq-num'>{i + 1}.</span>{item.question}</p>
			<p className='faq-text'>{item.answer}</p>
		</div>
	})

	return (
		<div className='wrapper'>

			<Helmet>
				<meta name="FAQ" content='FAQ' />
				<title>Post Scriptum — FAQ</title>
			</Helmet>

			<div className='sepi-bread-header extra'>
				<Breadcrumbs name="FAQ" link='/guestbook' extraName={t("pages.roles_list.guestbook")} />
			</div>

			<div className="faq-wrapper">
				{elem}
			</div>
		</div>
	)
}

export default FAQ