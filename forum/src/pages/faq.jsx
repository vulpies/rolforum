import React from 'react'
import Breadcrumbs from '../components/breadcrumbs'
import faqInfo from '../static_info/faq'
import { Helmet } from "react-helmet";

const FAQ = () => {

	const elem = faqInfo.map((item, i) => {
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
				<Breadcrumbs name="FAQ" link='/guestbook' extraName="Гостевая" />
			</div>

			<div className="faq-wrapper">
				{elem}
			</div>
		</div>
	)
}

export default FAQ