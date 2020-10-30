import { ThemeType } from '../enums/theme-type.enum';

export const ALL_THEMES = [
	{
		name: 'Кино',
		id: ThemeType.cinema,
	},
	{
		name: 'Образование',
		id: ThemeType.education,
	},
	{
		name: 'Выставка',
		id: ThemeType.exhibition,
	},
	{
		name: 'Шопинг',
		id: ThemeType.shopping,
	},
	{
		name: 'Спорт',
		id: ThemeType.sport,
	},
	{
		name: 'Концерт',
		id: ThemeType.concert,
	},
	{
		name: 'Отдых',
		id: ThemeType.relaxation,
	},
	{
		name: 'Прогулки',
		id: ThemeType.walks,
	},
	{
		name: 'Личные события',
		id: ThemeType.personalEvents,
	},
	{
		name: 'Театр',
		id: ThemeType.theatre,
	},
	{
		name: 'Спектакль',
		id: ThemeType.spectacle,
	},
	{
		name: 'Бар',
		id: ThemeType.bar,
	},
	{
		name: 'Митинг',
		id: ThemeType.meeting,
	},
	{
		name: 'Благотворительность',
		id: ThemeType.charity,
	},
];

export const ThemesNames = {
	[ThemeType.cinema]: 'Кино',
	[ThemeType.education]: 'Образование',
	[ThemeType.exhibition]: 'Выставка',
	[ThemeType.shopping]: 'Шопинг',
	[ThemeType.sport]: 'Спорт',
	[ThemeType.concert]: 'Концерт',
	[ThemeType.relaxation]: 'Отдых',
	[ThemeType.walks]: 'Прогулки',
	[ThemeType.personalEvents]: 'Личные события',
	[ThemeType.theatre]: 'Театр',
	[ThemeType.spectacle]: 'Спектакль',
	[ThemeType.bar]: 'Бар',
	[ThemeType.meeting]: 'Митинг',
	[ThemeType.charity]: 'Благотворительность',
};
