import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TeachingVisual from './TeachingVisual';

describe('TeachingVisual', () => {
  describe('angle-diagram', () => {
    it('should render an SVG for angle-diagram', () => {
      render(
        <TeachingVisual
          visualType="angle-diagram"
          visualProps={{ angleValue: 90, angleType: 'right' }}
        />
      );
      expect(screen.getByTestId('visual-angle-diagram')).toBeInTheDocument();
    });

    it('should display the angle value label', () => {
      render(
        <TeachingVisual
          visualType="angle-diagram"
          visualProps={{ angleValue: 90, angleType: 'right', showLabel: true }}
        />
      );
      expect(screen.getByText('90°')).toBeInTheDocument();
    });

    it('should display angle type label', () => {
      render(
        <TeachingVisual
          visualType="angle-diagram"
          visualProps={{ angleValue: 90, angleType: 'right', showLabel: true }}
        />
      );
      expect(screen.getByText(/right angle/i)).toBeInTheDocument();
    });
  });

  describe('worked-example', () => {
    const steps = ['Step 1: Set up the equation', 'Step 2: Solve for x', 'Step 3: Check answer'];

    it('should render worked-example visual', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      expect(screen.getByTestId('visual-worked-example')).toBeInTheDocument();
    });

    it('should show first step initially', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      expect(screen.getByText('Step 1: Set up the equation')).toBeInTheDocument();
    });

    it('should not show later steps initially', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      expect(screen.queryByText('Step 2: Solve for x')).not.toBeInTheDocument();
    });

    it('should reveal next step when clicking reveal button', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /reveal next step/i }));
      expect(screen.getByText('Step 2: Solve for x')).toBeInTheDocument();
    });

    it('should reveal all steps sequentially', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /reveal next step/i }));
      fireEvent.click(screen.getByRole('button', { name: /reveal next step/i }));
      expect(screen.getByText('Step 3: Check answer')).toBeInTheDocument();
    });

    it('should hide reveal button when all steps are shown', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: /reveal next step/i }));
      fireEvent.click(screen.getByRole('button', { name: /reveal next step/i }));
      expect(screen.queryByRole('button', { name: /reveal next step/i })).not.toBeInTheDocument();
    });

    it('should handle empty steps array', () => {
      render(
        <TeachingVisual
          visualType="worked-example"
          visualProps={{ steps: [] }}
        />
      );
      expect(screen.getByTestId('visual-worked-example')).toBeInTheDocument();
    });
  });

  describe('concept-diagram', () => {
    it('should render concept-diagram visual', () => {
      render(
        <TeachingVisual
          visualType="concept-diagram"
          visualProps={{ diagramId: 'complementary-angles' }}
        />
      );
      expect(screen.getByTestId('visual-concept-diagram')).toBeInTheDocument();
    });

    it('should display diagram title for complementary-angles', () => {
      render(
        <TeachingVisual
          visualType="concept-diagram"
          visualProps={{ diagramId: 'complementary-angles' }}
        />
      );
      expect(screen.getByText(/complementary angles/i)).toBeInTheDocument();
    });

    it('should display diagram title for supplementary-angles', () => {
      render(
        <TeachingVisual
          visualType="concept-diagram"
          visualProps={{ diagramId: 'supplementary-angles' }}
        />
      );
      expect(screen.getByText(/supplementary angles/i)).toBeInTheDocument();
    });

    it('should display diagram title for triangle-angle-sum', () => {
      render(
        <TeachingVisual
          visualType="concept-diagram"
          visualProps={{ diagramId: 'triangle-angle-sum' }}
        />
      );
      expect(screen.getByText(/triangle angle sum/i)).toBeInTheDocument();
    });

    it('should handle unknown diagram gracefully', () => {
      render(
        <TeachingVisual
          visualType="concept-diagram"
          visualProps={{ diagramId: 'unknown-diagram' }}
        />
      );
      expect(screen.getByTestId('visual-concept-diagram')).toBeInTheDocument();
    });
  });

  describe('none / unknown type', () => {
    it('should render nothing for none type', () => {
      const { container } = render(
        <TeachingVisual visualType="none" visualProps={{}} />
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
