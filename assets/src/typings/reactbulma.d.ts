interface BulmaProps {
  as?: string;
  className?: string;
}

interface ButtonProps extends BulmaProps {
  href?: string;
  large?: boolean;
  primary?: boolean;
}

interface ImageProps extends BulmaProps {
  is?: string;
  src: string;
}

interface TitleProps extends BulmaProps {
  spaced: boolean;
}

interface MediaComponent extends React.StatelessComponent<BulmaProps> {
 /* NOTE: I was able to type these static properties as strings, and
  * was not warned when using them, for example like so:
  * <Media.Left>...</Media.Left>
  * That makes me less than confident that these are being typed properly,
  * so beware. */
  Content: typeof React.Component;
  Left: typeof React.Component;
  Right: typeof React.Component;
}

declare module 'reactbulma' {
	import * as React from 'react';

	class Button extends React.Component<ButtonProps> {}
	class Container extends React.Component<BulmaProps> {}
	class Hero extends React.Component<BulmaProps> {}
	class Icon extends React.Component<BulmaProps> {}
	class Image extends React.Component<ImageProps> {}
  const Media: MediaComponent;
  class Title extends React.Component<TitleProps> {}
	class Section extends React.Component<BulmaProps> {}
	class SubTitle extends React.Component<BulmaProps> {}
}
