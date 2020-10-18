import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocale } from "../store/reducers/general/action";
import useTrans from "../hooks/useTrans";

const languages = [
	{ code: "en", name: "English" },
	{ code: "sp", name: "Spanish" },
];

const LanguageSwitcherSelector = () => {
	const currentLocale = useSelector((state) => state.general.currentLocale);

	const dispatch = useDispatch();

	const onChange = (e) => {
		dispatch(setCurrentLocale(e.target.value));
	};

	const { trans } = useTrans();

	return (
		<div className="lang">
			<span className="text-sm mr-3">{trans("general.Choose Language")}:</span>
			<select
				className="cursor-pointer outline-none appearance-none bg-transparent border px-2 rounded text-xs"
				onChange={onChange}
			>
				{languages.map((language, index) => (
					<option
						key={index}
						value={language.code}
						selected={currentLocale === language.code}
					>
						{language.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default LanguageSwitcherSelector;
