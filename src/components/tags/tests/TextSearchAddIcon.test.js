import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextSearchAddIcon from '../TextSearchAddIcon';
import { createTag } from '../../../api';
import i18n from '../../../utilities/translations/i18n';

jest.mock('../../../api', () => ({
  createTag: jest.fn(),
}));

jest.mock('../../../utilities/translations/i18n', () => jest.fn((key) => key));

describe('TextSearchAddIcon', () => {
  const onTagAssigned = jest.fn();
  const onClickTextField = jest.fn();
  const onBlurTextField = jest.fn();

  const tagOptions = [
    { uuid: '1', title: 'Tag1' },
    { uuid: '2', title: 'Tag2' },
    { uuid: '3', title: 'Tag3'}
  ];

  const existingTags = ['1'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render add icon initially', () => {
    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    expect(screen.getByTestId('add-icon-wrapper')).toBeInTheDocument();
  });

  it('should show input field when add icon is clicked', () => {
    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));

    expect(screen.getByTestId('input-text-field')).toBeInTheDocument();
  });

  it('should filter tags based on input value', () => {
    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'Tag2' } });
    
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should call onTagAssigned with existing tag uuid when an existing tag is clicked', () => {
    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'Tag2' } });

    fireEvent.click(screen.getByText('Tag2'));

    expect(onTagAssigned).toHaveBeenCalledWith('2');
  });

  it('should create a new tag when input value does not match existing tags', async () => {
    createTag.mockResolvedValue({ uuid: '3', title: 'NewTag' });

    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'NewTag' } });
    fireEvent.keyDown(screen.getByTestId('input-text-field'), { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(createTag).toHaveBeenCalledWith({ title: 'NewTag' }));
    expect(onTagAssigned).toHaveBeenCalledWith('3');
  });

  it('should handle errors when creating a new tag', async () => {
    createTag.mockRejectedValue(new Error('Failed to create tag'));

    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'NewTag' } });
    fireEvent.keyDown(screen.getByTestId('input-text-field'), { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(createTag).toHaveBeenCalledWith({ title: 'NewTag' }));
  });

  it('should show snackbar with appropriate message when tag is already assigned', async () => {
    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'Tag1' } });
    fireEvent.keyDown(screen.getByTestId('input-text-field'), { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(screen.getByText(i18n("tagAlreadyAssigned"))).toBeInTheDocument());
  });

  it('should show snackbar with appropriate message when creating a tag fails', async () => {
    createTag.mockRejectedValue(new Error('Failed to create tag'));

    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'NewTag' } });
    fireEvent.keyDown(screen.getByTestId('input-text-field'), { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(screen.getByText(i18n("errorCreatingTag"))).toBeInTheDocument());
  });

  it('should reset input and close text field after tag is assigned', async () => {
    createTag.mockResolvedValue({ uuid: '3', title: 'NewTag' });

    render(
      <TextSearchAddIcon
        onTagAssigned={onTagAssigned}
        tagOptions={tagOptions}
        existingTags={existingTags}
        onClickTextField={onClickTextField}
        onBlurTextField={onBlurTextField}
      />
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    fireEvent.change(screen.getByTestId('input-text-field'), { target: { value: 'NewTag' } });
    fireEvent.keyDown(screen.getByTestId('input-text-field'), { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(createTag).toHaveBeenCalledWith({ title: 'NewTag' }));

    expect(screen.queryByTestId('input-text-field')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-icon-wrapper')).toBeInTheDocument();
    expect(screen.queryByText('NewTag')).not.toBeInTheDocument();
  });
});
