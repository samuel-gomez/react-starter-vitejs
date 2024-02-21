import { render } from '@testing-library/react';
import Templates from '..';

const defaultProps = {
  submitTemplate: vi.fn(),
  onClearCodeEditor: vi.fn(),
};

describe('<Templates/>', () => {
  it('Should render Templates', () => {
    const { asFragment } = render(<Templates {...defaultProps} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="af-templates"
        >
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Suppression du code"
                  class="af-btn--circle af-btn--delete"
                  type="button"
                >
                  <i
                    aria-label="Icone suppression du code"
                    class="glyphicon glyphicon-trash"
                    role="img"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Liste"
                  class="af-btn--circle"
                  id="add-list"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Liste"
                    class="glyphicon glyphicon-list"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Titre h1"
                  class="af-btn--circle"
                  id="add-title__h1"
                  type="button"
                >
                  H1
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Titre h2"
                  class="af-btn--circle"
                  id="add-title__h2"
                  type="button"
                >
                  H2
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Titre h3"
                  class="af-btn--circle"
                  id="add-title__h3"
                  type="button"
                >
                  H3
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Titre h4"
                  class="af-btn--circle"
                  id="add-title__h4"
                  type="button"
                >
                  H4
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Paragraph"
                  class="af-btn--circle"
                  id="add-text"
                  type="button"
                >
                  P
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Restitution two columns"
                  class="af-btn--circle"
                  id="add-restitution__twoColumns"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Restitution two columns"
                    class="glyphicon glyphicon-list-alt"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Restitution one column"
                  class="af-btn--circle"
                  id="add-restitution__oneColumn"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Restitution one column"
                    class="glyphicon glyphicon-list-alt"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Modal"
                  class="af-btn--circle"
                  id="add-modal"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Modal"
                    class="glyphicon glyphicon-modal-window"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Panel basic"
                  class="af-btn--circle"
                  id="add-panel__basic"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Panel basic"
                    class="glyphicon glyphicon-credit-card"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            class="af-popover__wrapper"
          >
            <div
              class="af-popover__container af-popover__container--editor"
            >
              <div
                class="af-popover__container-over"
                role="presentation"
              >
                <button
                  aria-label="Ajout du code Accordion"
                  class="af-btn--circle"
                  id="add-accordion"
                  type="button"
                >
                  <i
                    aria-label="Icone ajout du code Accordion"
                    class="glyphicon glyphicon-credit-card"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});
