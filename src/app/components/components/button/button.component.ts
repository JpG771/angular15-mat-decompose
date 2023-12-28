import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(private pageService: PageService) {}
  
  ngOnInit() {
    setTimeout(() => this.pageService.currentPage$.next('button'));
  }

  buttonBase = `
  @use 'sass:map';
  @use '@material/touch-target' as mdc-touch-target;
  
  @use '../core/style/layout-common';
  @use '../core/mdc-helpers/mdc-helpers';
  
  // Adds styles necessary to provide stateful interactions with the button. This includes providing
  // content for the state container's ::before and ::after so that they can be given a background
  // color and opacity for states like hover, active, and focus. Additionally, adds styles to the
  // ripple and state container so that they fill the button, match the border radius, and avoid
  // pointer events.
  @mixin mat-private-button-interactive() {
    -webkit-tap-highlight-color: transparent;
  
    // The ripple container should match the bounds of the entire button.
    .mat-mdc-button-ripple,
    .mat-mdc-button-persistent-ripple,
    .mat-mdc-button-persistent-ripple::before {
      @include layout-common.fill;
  
      // Disable pointer events for the ripple container and state overlay because the container
      // will overlay the user content and we don't want to disable mouse events on the user content.
      // Pointer events can be safely disabled because the ripple trigger element is the host element.
      pointer-events: none;
  
      // Inherit the border radius from the parent so that state overlay and ripples don't exceed the
      // parent button boundaries. Note that an inherited border radius does not work properly if
      // the actual button element does have a border because it causes the inner content to be
      // smaller. We have special logic for stroked buttons to handle this scenario.
      border-radius: inherit;
    }
  
    // We use ::before so that we can reuse some of MDC's theming.
    .mat-mdc-button-persistent-ripple::before {
      content: '';
      opacity: 0;
      background-color: var(--mat-mdc-button-persistent-ripple-color);
    }
  
    .mat-ripple-element {
      background-color: var(--mat-mdc-button-ripple-color);
    }
  
    // The content should appear over the state and ripple layers, otherwise they may adversely affect
    // the accessibility of the text content.
    .mdc-button__label {
      z-index: 1;
    }
  
    // The focus indicator should match the bounds of the entire button.
    .mat-mdc-focus-indicator {
      @include layout-common.fill();
    }
  
    &:focus .mat-mdc-focus-indicator::before {
      content: '';
    }
  }
  
  // MDC's disabled buttons define a default cursor with pointer-events none. However, they select
  // :disabled for this, which does not affect anchor tags.
  // TODO(andrewseguin): Discuss with the MDC team about a mixin we can call for applying this style,
  // and note that having pointer-events may have unintended side-effects, e.g. allowing the user
  // to click the target underneath the button.
  @mixin mat-private-button-disabled() {
    &[disabled] {
      cursor: default;
      pointer-events: none;
      @content;
    }
  }
  
  @mixin mat-private-button-touch-target($is-square) {
    // Element used to ensure that the button has a touch target that meets the required minimum.
    // Note that we use this, instead of MDC's built-in \`mdc-button--touch\` class, because the MDC
    // class is implemented as \`margin-top: 6px; margin-bottom: 6px\` on the host element which
    // goes against our rule of not having margins on the host node. Furthermore, having the margin on
    // the button itself would require us to wrap it in another div. See:
    // https://github.com/material-components/material-components-web/tree/master/packages/mdc-button#making-buttons-accessible
    .mat-mdc-button-touch-target {
      @include mdc-touch-target.touch-target(
        $set-width: $is-square,
        $query: mdc-helpers.$mdc-base-styles-query);
    }
  }
  
  // Changes a button theme to exclude the ripple styles.
  @function mat-private-button-remove-ripple($theme) {
    @return map.merge($theme, (
      focus-state-layer-color: null,
      focus-state-layer-opacity: null,
      hover-state-layer-color: null,
      hover-state-layer-opacity: null,
      pressed-state-layer-color: null,
      pressed-state-layer-opacity: null,
    ));
  }
  `;

  buttonTheme = `
  @use 'sass:map';
  @use '@material/button/button' as mdc-button;
  @use '@material/button/button-theme' as mdc-button-theme;
  @use '@material/button/button-text-theme' as mdc-button-text-theme;
  @use '@material/button/button-filled-theme' as mdc-button-filled-theme;
  @use '@material/button/button-protected-theme' as mdc-button-protected-theme;
  @use '@material/button/button-outlined-theme' as mdc-button-outlined-theme;
  @use '@material/theme/theme-color' as mdc-theme-color;
  
  @use './button-theme-private';
  @use '../core/mdc-helpers/mdc-helpers';
  @use '../core/theming/theming';
  @use '../core/typography/typography';
  
  @mixin _button-variant($color) {
    @include mdc-button-text-theme.theme((
      label-text-color: $color,
    ));
  }
  
  @mixin _unelevated-button-variant($foreground, $background) {
    @include mdc-button-filled-theme.theme((
      container-color: $background,
      label-text-color: $foreground,
    ));
  }
  
  @mixin _raised-button-variant($foreground, $background) {
    @include mdc-button-protected-theme.theme((
      container-color: $background,
      label-text-color: $foreground,
    ));
  }
  
  @mixin _outlined-button-variant($color) {
    @include mdc-button-outlined-theme.theme((
      label-text-color: $color,
    ));
  }
  
  @mixin color($config-or-theme) {
    $config: theming.get-color-config($config-or-theme);
    @include mdc-helpers.using-mdc-theme($config) {
      $is-dark: map.get($config, is-dark);
      $on-surface: mdc-theme-color.prop-value(on-surface);
      $surface: mdc-theme-color.prop-value(surface);
      $disabled-ink-color: rgba($on-surface, if($is-dark, 0.5, 0.38));
      $disabled-container-color: rgba($on-surface, 0.12);
      $primary: mdc-theme-color.prop-value(primary);
      $on-primary: mdc-theme-color.prop-value(on-primary);
      $secondary: mdc-theme-color.prop-value(secondary);
      $on-secondary: mdc-theme-color.prop-value(on-secondary);
      $error: mdc-theme-color.prop-value(error);
      $on-error: mdc-theme-color.prop-value(on-error);
  
      .mat-mdc-button {
        &.mat-unthemed {
          @include _button-variant($on-surface);
        }
  
        &.mat-primary {
          @include _button-variant($primary);
        }
  
        &.mat-accent {
          @include _button-variant($secondary);
        }
  
        &.mat-warn {
          @include _button-variant($error);
        }
  
        @include button-theme-private.apply-disabled-style() {
          @include mdc-button-text-theme.theme((
            // We need to pass both the disabled and enabled values, because the enabled
            // ones apply to anchors while the disabled ones are for buttons.
            disabled-label-text-color: $disabled-ink-color,
            label-text-color: $disabled-ink-color
          ));
        }
      }
  
      .mat-mdc-unelevated-button {
        &.mat-unthemed {
          @include _unelevated-button-variant($on-surface, $surface);
        }
  
        &.mat-primary {
          @include _unelevated-button-variant($on-primary, $primary);
        }
  
        &.mat-accent {
          @include _unelevated-button-variant($on-secondary, $secondary);
        }
  
        &.mat-warn {
          @include _unelevated-button-variant($on-error, $error);
        }
  
        @include button-theme-private.apply-disabled-style() {
          @include mdc-button-filled-theme.theme((
            // We need to pass both the disabled and enabled values, because the enabled
            // ones apply to anchors while the disabled ones are for buttons.
            disabled-container-color: $disabled-container-color,
            disabled-label-text-color: $disabled-ink-color,
            container-color: $disabled-container-color,
            label-text-color: $disabled-ink-color,
          ));
        }
      }
  
      .mat-mdc-raised-button {
        &.mat-unthemed {
          @include _raised-button-variant($on-surface, $surface);
        }
  
        &.mat-primary {
          @include _raised-button-variant($on-primary, $primary);
        }
  
        &.mat-accent {
          @include _raised-button-variant($on-secondary, $secondary);
        }
  
        &.mat-warn {
          @include _raised-button-variant($on-error, $error);
        }
  
        @include button-theme-private.apply-disabled-style() {
          @include mdc-button-protected-theme.theme((
            // We need to pass both the disabled and enabled values, because the enabled
            // ones apply to anchors while the disabled ones are for buttons.
            disabled-container-color: $disabled-container-color,
            disabled-label-text-color: $disabled-ink-color,
            container-color: $disabled-container-color,
            label-text-color: $disabled-ink-color,
            container-elevation: 0,
          ));
        }
      }
  
      .mat-mdc-outlined-button {
        @include mdc-button-outlined-theme.theme((
          outline-color: rgba(mdc-theme-color.prop-value(on-surface), 0.12)
        ));
  
        &.mat-unthemed {
          @include _outlined-button-variant($on-surface);
        }
  
        &.mat-primary {
          @include _outlined-button-variant($primary);
        }
  
        &.mat-accent {
          @include _outlined-button-variant($secondary);
        }
  
        &.mat-warn {
          @include _outlined-button-variant($error);
        }
  
        @include button-theme-private.apply-disabled-style() {
          @include mdc-button-outlined-theme.theme((
            // We need to pass both the disabled and enabled values, because the enabled
            // ones apply to anchors while the disabled ones are for buttons.
            label-text-color: $disabled-ink-color,
            disabled-label-text-color: $disabled-ink-color,
            outline-color: rgba($on-surface, 0.12),
            disabled-outline-color: rgba($on-surface, 0.12),
          ));
        }
      }
  
      // Ripple colors
      .mat-mdc-button, .mat-mdc-outlined-button {
        @include button-theme-private.ripple-theme-styles($config, false);
      }
  
      .mat-mdc-raised-button, .mat-mdc-unelevated-button {
        @include button-theme-private.ripple-theme-styles($config, true);
      }
    }
  }
  
  @mixin typography($config-or-theme) {
    $config: typography.private-typography-to-2018-config(
      theming.get-typography-config($config-or-theme));
    @include mdc-helpers.using-mdc-typography($config) {
      @include mdc-button.without-ripple($query: mdc-helpers.$mdc-typography-styles-query);
    }
  }
  
  @mixin density($config-or-theme) {
    $density-scale: theming.get-density-config($config-or-theme);
    .mat-mdc-button,
    .mat-mdc-raised-button,
    .mat-mdc-unelevated-button,
    .mat-mdc-outlined-button {
      // Use \`mat-mdc-button-base\` to increase the specificity over the button's structural styles.
      &.mat-mdc-button-base {
        @include mdc-button-theme.density($density-scale, $query: mdc-helpers.$mdc-base-styles-query);
        @include button-theme-private.touch-target-density($density-scale);
      }
    }
  }
  
  @mixin theme($theme-or-color-config) {
    $theme: theming.private-legacy-get-theme($theme-or-color-config);
    @include theming.private-check-duplicate-theme-styles($theme, 'mat-button') {
      $color: theming.get-color-config($theme);
      $density: theming.get-density-config($theme);
      $typography: theming.get-typography-config($theme);
  
      @if $color != null {
        @include color($color);
      }
      @if $density != null {
        @include density($density);
      }
      @if $typography != null {
        @include typography($typography);
      }
    }
  }
  `
}
