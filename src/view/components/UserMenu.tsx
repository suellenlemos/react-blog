import { ExitIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export const UserMenu = () => {
  const { logout, user } = useAuth();

  const getInitials = (name?: string): string => {
    if (!name) {
      return '';
    }
    const words = name.trim().split(/\s+/);
    if (words.length === 0) return '';

    const firstLetter = words[0][0].toUpperCase();
    const lastLetter = words[words.length - 1][0].toUpperCase();

    return firstLetter + lastLetter;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-10 h-10 flex items-center justify-center border border-teal-900">
          <span className="text-sm tracking-[-0.5px] text-black font-medium">
            {getInitials(user?.name)}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={logout}>
          Log out
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
