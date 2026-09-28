import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Diagram } from './Diagram';
import {
  __resetRegistry,
  registerConstructedRenderer,
  registerInteractiveRenderer,
} from './registry';
import { diagramSpecSchema } from '@/content/schema';

afterEach(() => __resetRegistry());

describe('DiagramSpec contract', () => {
  it('represents textbook image diagrams', () => {
    const spec = diagramSpecSchema.parse({
      kind: 'image',
      id: 'fig-1',
      alt: 'مثلث قائم الزاوية',
      src: 'diagrams/fig-1.svg',
    });
    expect(spec.kind).toBe('image');
  });

  it('represents future interactive diagrams', () => {
    const spec = diagramSpecSchema.parse({
      kind: 'interactive',
      id: 'fig-2',
      alt: 'زاوية قابلة للتحريك',
      renderer: 'angle-explorer',
    });
    expect(spec.kind).toBe('interactive');
  });

  it('represents future constructed/vector diagrams', () => {
    const spec = diagramSpecSchema.parse({
      kind: 'constructed',
      id: 'fig-3',
      alt: 'مثلث مرسوم بالإحداثيات',
      renderer: 'triangle',
    });
    expect(spec.kind).toBe('constructed');
  });

  it('rejects diagrams without Arabic alt text', () => {
    expect(() =>
      diagramSpecSchema.parse({ kind: 'image', id: 'fig-4', alt: '', src: 'a.svg' }),
    ).toThrow();
  });

  it('rejects absolute image sources that would bypass the Pages base path', () => {
    expect(() =>
      diagramSpecSchema.parse({ kind: 'image', id: 'fig-5', alt: 'رسم', src: '/a.svg' }),
    ).toThrow();
  });
});

describe('Diagram dispatcher', () => {
  it('renders an image diagram with its alt text and base-prefixed src', () => {
    render(
      <Diagram
        spec={{
          kind: 'image',
          origin: 'textbook',
          id: 'fig-1',
          alt: 'مثلث قائم الزاوية',
          src: 'diagrams/fig-1.svg',
        }}
      />,
    );
    const image = screen.getByAltText('مثلث قائم الزاوية');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain('diagrams/fig-1.svg');
  });

  it('degrades gracefully when an interactive renderer is not registered', () => {
    render(
      <Diagram
        spec={{
          kind: 'interactive',
          origin: 'authored',
          id: 'fig-2',
          alt: 'زاوية قابلة للتحريك',
          renderer: 'angle-explorer',
          params: {},
        }}
      />,
    );
    expect(screen.getByText('الرسم غير متاح بعد')).toBeInTheDocument();
    expect(screen.getByText(/angle-explorer/)).toBeInTheDocument();
  });

  it('degrades gracefully when a constructed renderer is not registered', () => {
    render(
      <Diagram
        spec={{
          kind: 'constructed',
          origin: 'authored',
          id: 'fig-3',
          alt: 'مثلث مرسوم',
          renderer: 'triangle',
          construction: {},
        }}
      />,
    );
    expect(screen.getByText('الرسم غير متاح بعد')).toBeInTheDocument();
  });

  it('uses a registered interactive renderer once one exists', () => {
    registerInteractiveRenderer('angle-explorer', () => <div>مكوّن تفاعلي</div>);
    render(
      <Diagram
        spec={{
          kind: 'interactive',
          origin: 'authored',
          id: 'fig-2',
          alt: 'زاوية',
          renderer: 'angle-explorer',
          params: {},
        }}
      />,
    );
    expect(screen.getByText('مكوّن تفاعلي')).toBeInTheDocument();
  });

  it('uses a registered constructed renderer once one exists', () => {
    registerConstructedRenderer('triangle', () => <div>مثلث متجهي</div>);
    render(
      <Diagram
        spec={{
          kind: 'constructed',
          origin: 'authored',
          id: 'fig-3',
          alt: 'مثلث',
          renderer: 'triangle',
          construction: {},
        }}
      />,
    );
    expect(screen.getByText('مثلث متجهي')).toBeInTheDocument();
  });

  it('refuses duplicate renderer registrations', () => {
    registerInteractiveRenderer('dup', () => null);
    expect(() => registerInteractiveRenderer('dup', () => null)).toThrow();
  });
});

describe('reference diagram — faithful placeholder', () => {
  const spec = {
    kind: 'reference' as const,
    origin: 'textbook' as const,
    id: 'fig-x',
    alt: 'وصف عربي للشكل مع الرمز $AB$',
    source: { page: 7, locator: 'شكل تدرُب ②' },
    reason: 'تعذّر التحقّق من التفاصيل.',
  };

  it('is representable by the schema', () => {
    expect(() => diagramSpecSchema.parse(spec)).not.toThrow();
  });

  it('requires a source page (unlike every other variant)', () => {
    expect(() => diagramSpecSchema.parse({ kind: 'reference', id: 'fig-y', alt: 'وصف' })).toThrow();
  });

  it('renders the agreed placeholder text', () => {
    render(<Diagram spec={spec} />);
    expect(screen.getByText('يوجد رسم هنا — راجع الكتاب')).toBeInTheDocument();
  });

  it('shows the textbook page number, LTR-isolated', () => {
    render(<Diagram spec={spec} />);
    const page = screen.getByText('7');
    expect(page).toHaveAttribute('dir', 'ltr');
  });

  it('shows the Arabic description with its maths rendered', () => {
    const { container } = render(<Diagram spec={spec} />);
    expect(container.textContent).toContain('وصف عربي للشكل');
    expect(container.querySelector('.katex')).not.toBeNull();
  });

  it('is NOT styled as the unregistered-renderer defect state', () => {
    render(<Diagram spec={spec} />);
    expect(screen.queryByText('الرسم غير متاح بعد')).toBeNull();
  });
});
