import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const HorizontalWidthInOutAnimation: Animation = (
  width: { in?: string; out?: string } = {},
  styles: { in?: object; out?: object } = {},
  duration: { in?: string; out?: string } = {}
) => trigger(
  'horizontalWidthInOut',
  [
    state(
      'in',
      style({ width: width.in, ...styles.in })
    ),
    state(
      'out',
      style({ width: width.out || '0', ...styles.out })
    ),
    transition('in => out', animate(`${duration.in || '250ms'} ease-in-out`)),
    transition('out => in', animate(`${duration.out || '250ms'} ease-in-out`))
  ]
);