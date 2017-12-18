interface BulmaProps {
  as?: string;
  className?: string;
}

interface ButtonProps extends BulmaProps {
  href?: string;
  large?: boolean;
  primary?: boolean;
}

interface TitleProps extends BulmaProps {
  spaced: boolean;
}

declare module 'reactbulma' {
	import * as React from 'react';
	import 'reactbulma';

	export class Button extends React.Component<ButtonProps> {}
	export class Container extends React.Component<BulmaProps> {}
	export class Hero extends React.Component<BulmaProps> {}
	export class Icon extends React.Component<BulmaProps> {}
	export class Title extends React.Component<TitleProps> {}
	export class Section extends React.Component<BulmaProps> {}
	export class SubTitle extends React.Component<BulmaProps> {}
}
