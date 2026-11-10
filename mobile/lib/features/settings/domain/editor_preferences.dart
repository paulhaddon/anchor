import '../../../core/theme/note_typography.dart';

class EditorPreferences {
  /// Sorts checked items to the bottom.
  final bool sortChecklistItems;

  final NoteFont noteFont;
  final NoteTextSize noteTextSize;

  /// A multiple of the font size; null follows the display density.
  final double? noteLineHeight;

  const EditorPreferences({
    this.sortChecklistItems = true,
    this.noteFont = NoteFont.sans,
    this.noteTextSize = NoteTextSize.standard,
    this.noteLineHeight,
  });

  EditorPreferences copyWith({
    bool? sortChecklistItems,
    NoteFont? noteFont,
    NoteTextSize? noteTextSize,
    double? noteLineHeight,
  }) {
    return EditorPreferences(
      sortChecklistItems: sortChecklistItems ?? this.sortChecklistItems,
      noteFont: noteFont ?? this.noteFont,
      noteTextSize: noteTextSize ?? this.noteTextSize,
      noteLineHeight: noteLineHeight ?? this.noteLineHeight,
    );
  }
}
