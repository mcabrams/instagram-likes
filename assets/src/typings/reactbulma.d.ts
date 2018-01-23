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

interface LevelComponent extends React.StatelessComponent<BulmaProps> {
 /* NOTE: I was able to type these static properties as strings, and
  * was not warned when using them, for example like so:
  * <Media.Left>...</Media.Left>
  * That makes me less than confident that these are being typed properly,
  * so beware. */
  Left: typeof React.Component;
  Item: typeof React.Component;
}

interface MediaComponent extends React.StatelessComponent<BulmaProps> {
  Content: typeof React.Component;
  Left: typeof React.Component;
  Right: typeof React.Component;
}

interface TableComponent extends React.StatelessComponent<BulmaProps> {
  Body: typeof React.Component;
  Head: typeof React.Component;
  Td: typeof React.Component;
  Th: typeof React.Component;
  Tr: typeof React.Component;
}

declare module 'reactbulma' {
	import * as React from 'react';

	class Button extends React.Component<ButtonProps> {}
	class Container extends React.Component<BulmaProps> {}
	class Hero extends React.Component<BulmaProps> {}
	class Icon extends React.Component<BulmaProps> {}
	class Image extends React.Component<ImageProps> {}
  const Level: LevelComponent;
  const Media: MediaComponent;
  const Table: TableComponent;
  class Title extends React.Component<TitleProps> {}
	class Section extends React.Component<BulmaProps> {}
	class SubTitle extends React.Component<BulmaProps> {}
}
